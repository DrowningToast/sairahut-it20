import { z } from 'zod';
import { createRouter } from '../context';
import { freshmenProcedure, protectedProcedure } from '../procedure';
import { prisma } from '$lib/serverUtils';
import { TRPCError } from '@trpc/server';
import { freshmenRegister } from '$lib/zod';
import { AirtableController } from '$lib/airtable-api/controller';
import type { FreshmenDetails, MagicVerseCast, Prisma, User } from 'database';
import { FreshmenDetailsController } from '../database/freshmen/controller';
import { determineYear, shuffle } from '$lib/utils';
import { PasscodeController } from '../database/passcode/controller';
import { ResinController } from '../database/resin/controller';
import { PairController } from '../database/pair/controller';
import { SophomoreDetailsController } from '../database/sophomore/controller';

interface SearchQuery {
	where: {
		first_name?: {
			contains: string | undefined;
		};
		nickname?: {
			contains: string | undefined;
		};
		student_id?: {
			contains: string | undefined;
		};
	};
}

export const checkIfAlreadyScanThisSophomore = async (freshmen: User, secret: string) => {
	const [targetQRCode, alreadyScanned] = await Promise.all([
		prisma.qRInstances.findUnique({
			where: {
				secret
			}
		}),
		prisma.qRInstances.findMany({
			where: {
				scannedBy: {
					some: {
						userId: freshmen.id
					}
				}
			}
		})
	]);

	return !!alreadyScanned.find((scanned) => scanned.ownerId === targetQRCode?.ownerId);

	// return !!alreadyScanned.find((scanned) => scanned.secret === secret);
};

export const checkIfAlreadyUsePasscodeThisSophomore = async (
	freshmen: Prisma.FreshmenDetailsWhereUniqueInput,
	secret: string
) => {
	const [targetPasscode, scannedPasscode] = await Promise.all([
		prisma.passcodeInstances.findUnique({
			where: {
				content: secret
			}
		}),
		prisma.passcodeInstances.findMany({
			where: {
				usedBy: freshmen
			}
		})
	]);

	return !!scannedPasscode.find((scanned) => scanned.ownerId === targetPasscode?.ownerId);
};

export const freshmenRouters = createRouter({
	regis: protectedProcedure.input(freshmenRegister).mutation(async ({ input, ctx }) => {
		const { user } = ctx;

		const student_id = user?.email?.substring(0, 8);
		if (!student_id)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				cause: 'Unable to determine user student id'
			});

		// check if atleast one of the contact url is entered
		if (!(input.instagram_link || input.facebook_link)) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				cause: 'Require at least of the social media URLs'
			});
		}

		// insert information into airtable here
		// Sun จัดการให้หน่อย
		const data = {
			student_id: student_id,
			first_name: input.first_name,
			last_name: input.last_name,
			phone: input.phone,
			nickname: input.nickname,
			branch: input.branch,
			facebook_link: input.facebook_link as string,
			instagram_link: input.instagram_link as string,
			title: input.title
		};

		await AirtableController.participantIT21.insertFreshmen(data);

		// insert data into db
		await FreshmenDetailsController(prisma).createFreshmenDetails({
			branch: input.branch,
			first_name: input.first_name,
			last_name: input.last_name,
			student_id,
			nickname: input.nickname,
			title: input.title,
			phone: input.phone,
			facebook_link: input.facebook_link,
			instagram_link: input.instagram_link,
			user: {
				connect: {
					id: user?.id
				}
			}
		});

		return 'OK';
	}),

	// get the requester latest information
	getMyInfo: freshmenProcedure.query(async ({ ctx }) => {
		return ctx.user?.freshmenDetails;
	}),

	// Get the owner information of this qr code
	getQRInfo: freshmenProcedure.input(z.string().length(6)).query(async ({ ctx, input }) => {
		const data = await prisma.qRInstances.findUnique({
			where: {
				secret: input
			},
			include: {
				owner: {
					select: {
						nickname: true,
						fullname: true,
						student_id: true
					}
				},
				scannedBy: true
			}
		});

		// Check if scanning the same person or not
		const already = await checkIfAlreadyScanThisSophomore(ctx.user!, input);

		return { ...data, already };
	}),
	submitScannedQR: freshmenProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const { user } = ctx;

		if (!user?.id) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'User id not found'
			});
		}

		const data = await prisma.qRInstances.findUnique({
			where: {
				secret: input
			},
			select: {
				scannedBy: true,
				quota: true,
				id: true
			}
		});

		// qr code not found
		if (!data) {
			return {
				success: 0,
				message: `QR Instance with ID: ${input} not found.`
			};
			// the qr is out of quota
		} else if (data.quota <= 0) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'QR Code has expired'
			});
			// Scanning the same qr code
		} else if (data.scannedBy.map((scanned) => scanned.id).includes(user.id)) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'QR Code already scanned'
			});
		}

		// Check if scanning the same person or not
		const already = await checkIfAlreadyScanThisSophomore(ctx.user!, input);
		if (already) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Already scanned this sophomore'
			});
		}

		// If everything is fine
		// Decrease the quota of the qr instance
		// Increase the amount of spirit shard the freshmen has
		// Also increase the amount of humanity the sophomore has

		await prisma.$transaction([
			prisma.qRInstances.update({
				where: {
					secret: input
				},
				data: {
					scannedBy: {
						connect: {
							userId: user?.id
						}
					},
					quota: {
						decrement: 1
					}
				}
			}),
			FreshmenDetailsController(prisma).incrementFreshmenBalance({
				userId: user.id
			}),

			prisma.qRInstances.update({
				where: {
					id: data.id
				},
				data: {
					owner: {
						update: {
							user: {
								update: {
									balance: {
										increment: 1
									}
								}
							}
						}
					}
				}
			})
		]);

		return {
			success: 1,
			message: 'OK'
		};
	}),

	/**
	 * Safe
	 */
	getAllFreshmens: protectedProcedure
		.input(
			z.object({
				queryBy: z.enum(['STUDENT_ID', 'FIRSTNAME', 'NICKNAME']),
				q: z.string().optional(),
				first: z.number(),
				last: z.number()
			})
		)
		.query(async ({ input }) => {
			let searchQuery: SearchQuery | undefined;

			const { q, queryBy, first, last } = input;

			let data: Partial<FreshmenDetails>[] = [];

			if (queryBy === 'FIRSTNAME') {
				searchQuery = {
					where: {
						first_name: {
							contains: q
						}
					}
				};
			} else if (queryBy === 'NICKNAME') {
				searchQuery = {
					where: {
						nickname: {
							contains: q
						}
					}
				};
			} else if (queryBy === 'STUDENT_ID') {
				searchQuery = {
					where: {
						student_id: {
							contains: q
						}
					}
				};
			}
			data = await prisma.freshmenDetails.findMany({
				...searchQuery,
				select: {
					student_id: true,
					first_name: true,
					nickname: true,
					facebook_link: true,
					instagram_link: true,
					user: {
						select: {
							balance: true
						}
					}
				},
				skip: first,
				take: last
			});
			return {
				data
			};
		}),
	getPasscodeInfo: freshmenProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const res = await PasscodeController(prisma).getPasscode({
			content: input
		});

		if (!res) {
			return {
				success: false,
				payload: `Passcode with passcode: "${input}" not found`
			};
		} else {
			const samePerson = await checkIfAlreadyUsePasscodeThisSophomore(
				{ id: ctx.user!.freshmenDetails!.id! },
				input
			);

			return {
				success: true,
				payload: {
					passcode: res?.content,
					nickname: res?.owner.nickname,
					fullname: res?.owner.fullname,
					faction: res?.owner.user.faction?.name,
					/**
					 * has the code already been used by someone else?
					 */
					isExpired: res?.usedById !== null,
					/**
					 * Already scanned this sophomore
					 */
					hasScanned: samePerson,
					gen: determineYear(res?.owner.student_id as string)
				}
			};
		}
	}),
	submitPasscode: freshmenProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const freshmenId = ctx.user?.freshmenDetails?.id as string;

		const passcodeQuery = await PasscodeController(prisma).getPasscode({
			content: input
		});

		if (!passcodeQuery) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Passcode not found'
			});
		}

		// check if expires
		if (passcodeQuery.usedBy) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Passcode already used'
			});
		}

		// check using passcode of the same person
		const alreadyScanned = await checkIfAlreadyUsePasscodeThisSophomore(
			{
				id: freshmenId
			},
			input
		);

		if (alreadyScanned)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Already scanned this member'
			});

		// check if the user has enough resin or not
		const resinQuota = (await ResinController(prisma).getTotalResin({ id: freshmenId })) ?? 0;
		if (resinQuota < 5)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Not enough resin'
			});

		// decrease resin quota
		await ResinController(prisma).decrementResin({
			id: freshmenId
		});

		const BELLS = 5;
		let SHARDS = 1;

		if (passcodeQuery.owner.user.faction?.handler === ctx.user?.faction?.handler) {
			SHARDS = 2;
		}

		// mark the passcode as used
		// increase the passcode point
		await prisma.$transaction([
			PasscodeController(prisma).setAsUsed(
				{
					id: passcodeQuery.id
				},
				{
					id: freshmenId
				}
			),
			FreshmenDetailsController(prisma).increasePasscodePoints(
				{
					id: freshmenId
				},
				BELLS
			),
			FreshmenDetailsController(prisma).incrementFreshmenBalance(
				{
					id: freshmenId
				},
				SHARDS
			)
		]);

		// check prior easter status
		// if the user already unlocked the easteregg, don't trigger it again
		const priorEasterEgg = !!ctx.user?.freshmenDetails?.easterEgg;

		const easterEgg = await FreshmenDetailsController(prisma).updateEasterEggStatusById(freshmenId);

		return {
			success: true,
			payload: {
				...passcodeQuery,
				bells: BELLS,
				shards: SHARDS,
				easterEgg: priorEasterEgg ? false : easterEgg
			}
		};
	}),

	getRevealedHints: freshmenProcedure.query(async ({ ctx }) => {
		return await FreshmenDetailsController(prisma).getRevealedHints({
			id: ctx.user!.freshmenDetails!.id
		});
	}),

	getScannedQRs: freshmenProcedure.query(async ({ ctx }) => {
		const { user } = ctx;

		const res = await FreshmenDetailsController(prisma).getFreshmenById(
			user?.freshmenDetails?.id as string
		);

		return {
			success: true,
			payload: res?.scannedQrs
		};
	}),

	getUsedPasscodes: freshmenProcedure.query(async ({ ctx }) => {
		const { user } = ctx;

		const res = await FreshmenDetailsController(prisma).getFreshmenById(
			user?.freshmenDetails?.id as string
		);

		return {
			success: true,
			payload: res?.usedPasscodes
		};
	}),

	getNextHintPrice: freshmenProcedure.query(async ({ ctx }) => {
		const freshId = ctx.user?.freshmenDetails!.id;
		const freshmenController = FreshmenDetailsController(prisma);
		return await freshmenController.getNextHintPrice({ id: freshId });
	}),

	buyHint: freshmenProcedure.query(async ({ ctx }) => {
		// check if the user has pair or not
		const pair = await prisma.pair.findUnique({
			where: {
				freshmenDetailsId: ctx.user?.freshmenDetails?.id
			}
		});
		if (!pair) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Pair not found'
			});
		}

		const freshId = ctx.user?.freshmenDetails!.id;
		const freshmenController = FreshmenDetailsController(prisma);
		const hints =
			(await freshmenController.getRevealedHints({
				id: freshId
			})) ?? [];

		// check if already unlock all hint
		if (hints?.length >= 10)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Already have unlocked all the hints'
			});

		// get the money the user has
		const money = ctx.user!.freshmenDetails!.passcodePoints;

		const cost = await freshmenController.getNextHintPrice({ id: freshId });

		if (cost > money)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Not enough money'
			});

		// begin buying hint
		await prisma.$transaction([freshmenController.decrementPasscodePoint({ id: freshId }, cost)]);

		const revealed = await freshmenController.revealNextHint({ id: freshId });

		return revealed;
	}),

	checkReachMilestone: freshmenProcedure.query(async ({ ctx }) => {
		const freshId = ctx.user?.freshmenDetails?.id;

		if (!freshId)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: "The user doesn't have freshmen id"
			});

		const freshFactionHandler = ctx.user?.faction?.handler;

		if (!freshFactionHandler)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: "The user doesn't have a faction"
			});

		if (!ctx.user?.faction?.handler)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: "The user doesn't have a faction"
			});

		const AMOUNT_THRESHOLD = 6;

		// query the same faction who has scanned
		const logs = await prisma.passcodeInstances.findMany({
			where: {
				usedBy: {
					id: freshId
				},
				owner: {
					user: {
						faction: {
							handler: freshFactionHandler
						}
					}
				}
			},
			orderBy: {
				update_at: 'asc'
			},
			select: {
				owner: {
					select: {
						fullname: true,
						nickname: true,
						student_id: true,
						branch: true
					}
				}
			},
			take: AMOUNT_THRESHOLD
		});

		if (logs.length >= AMOUNT_THRESHOLD) {
			// get the result
			const pair = await prisma.pair.findUnique({
				where: {
					freshmenDetailsId: freshId
				},
				select: {
					sophomore: {
						select: {
							student_id: true
						}
					}
				}
			});

			const detectPair = !!logs.find((log) => log.owner.student_id === pair?.sophomore.student_id);

			return {
				reached: true,
				detectPair,
				threshold: AMOUNT_THRESHOLD,
				logs
			};
		} else {
			return {
				reached: false,
				threshold: AMOUNT_THRESHOLD,
				logs
			};
		}
	}),

	submitShowdownQR: freshmenProcedure
		.input(
			z.object({
				qrCodeContent: z.string()
			})
		)
		.query(async ({ ctx, input }) => {
			const { qrCodeContent } = input;
			const { user } = ctx;

			// find qr code that scanned
			const qrRes = await prisma.magicVerseIdentificationInstance.findUnique({
				where: {
					content: qrCodeContent
				},
				include: {
					sophomoreDetails: {
						select: {
							nickname: true,
							fullname: true,
							branch: true,
							user: {
								select: {
									faction: {
										select: {
											handler: true,
											name: true
										}
									},
									balance: true,
									email: true
								}
							}
						}
					}
				}
			});

			// if the qr is not found, (invalid qr code) throw
			if (!qrRes) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: `QR Code with code: "${qrCodeContent}" not found.`
				});
			}

			// if the qr code is used
			if (qrRes.isExpired)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: `The qr has expired`
				});

			// if the freshmen id is not found, throw (should be found)
			const freshmenId = user?.freshmenDetails?.id;
			if (!freshmenId)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'FRESHMEN ID NOT FOUND'
				});

			// mark the id as expired
			await prisma.magicVerseIdentificationInstance.update({
				data: {
					isExpired: true
				},
				where: {
					id: qrRes.id
				}
			});

			// Check if the player has the progress or not
			const starterVerses = await prisma.starterMagicVerse.findUnique({
				where: {
					sophomoreDetailsId_freshmenDetailsId: {
						freshmenDetailsId: freshmenId,
						sophomoreDetailsId: qrRes.sophomoreDetailsId
					}
				},
				select: {
					verses: true
				}
			});

			// If yes
			if (starterVerses)
				return {
					success: true,
					payload: {
						type: 'CACHED',
						/**
						 * QR Code target information
						 */
						target: qrRes,
						/**
						 * Starter hints
						 */
						starter: starterVerses?.verses
						/**
						 * The result of last attempt
						 */
						// last: last
					}
				};

			// If not
			// Try to identify if the player should get starter spells?
			let spells = 0;

			const beforeFriday = new Date();
			beforeFriday.setFullYear(2023, 7, 19);

			// Check if the player has scanned the target before or not
			const scanned = await prisma.qRInstances.findFirst({
				where: {
					owner: {
						id: qrRes.id
					},
					scannedBy: {
						some: {
							id: freshmenId
						}
					}
				}
			});

			// If the player has scanned qr code of the target before
			if (scanned) {
				spells++;
			}

			// If the player has more balance than the target
			if (ctx.user?.balance ?? 0 >= qrRes.sophomoreDetails.user.balance) {
				spells++;
			}

			// Get the target magic verses
			const target = await prisma.sophomoreDetails.findUnique({
				where: {
					id: qrRes.sophomoreDetailsId
				},
				select: {
					verses: {
						select: {
							cost: true,
							name: true,
							handler: true
						}
					}
				}
			});
			const magicVerses = target?.verses ?? [];

			// list of random verses choosen
			const randomVerses = [];
			console.log(spells);

			for (let i = 0; i < spells; i++) {
				const rando = shuffle(magicVerses);
				randomVerses.push(rando[0]);
			}

			const starter = await prisma.starterMagicVerse.create({
				data: {
					verses: {
						connect: randomVerses.map((verse) => {
							return {
								handler: verse.handler
							};
						})
					},
					freshmenDetailsId: freshmenId,
					sophomoreDetailsId: qrRes.sophomoreDetailsId
				},
				select: {
					verses: true
				}
			});

			return {
				success: true,
				payload: {
					starter: starter.verses,
					target: qrRes,
					type: 'NEW',
					last: undefined
				}
			};
		}),

	getLatestMagicVerse: freshmenProcedure
		.input(
			z.object({
				sophomoreId: z.string()
			})
		)
		.query(async ({ ctx, input }) => {
			const { sophomoreId } = input;
			const { user } = ctx;

			const res = await prisma.magicVerseCast.findFirst({
				orderBy: {
					create_at: 'desc'
				},
				where: {
					casterId: user?.freshmenDetails?.id,
					targetId: sophomoreId,
					caster: {
						id: ctx.user?.freshmenDetails?.id
					}
				},
				include: {
					verses: true
				}
			});

			return {
				success: true,
				payload: {
					lastCast: res ?? undefined
				}
			};
		}),

	// When freshmen submit verse, Code will run chcek the result of verse
	submitMagicVerse: freshmenProcedure
		.input(
			z.object({
				answer: z.array(z.string()).min(3).max(3),
				sophomoreId: z.string()
			})
		)
		.query(async ({ ctx, input }) => {
			const { answer, sophomoreId } = input;
			const sophomoreController = SophomoreDetailsController(prisma);
			const freshmenController = FreshmenDetailsController(prisma);

			const { user } = ctx;
			const freshId = user?.freshmenDetails?.id as string;

			// หา verses ของ sophomore
			const sophomore = await sophomoreController.findUnique({ id: sophomoreId });
			if (!sophomore)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Invalid sophomore id'
				});

			// Fetch and validate the user input verses
			const answerVerses = await Promise.all(
				answer.map(async (a) => {
					return await prisma.magicVerses.findUnique({
						where: {
							handler: a
						}
					});
				})
			);

			// If found invalid verse
			if (answerVerses.find((verse) => verse === null))
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Invalid verse, verse not found'
				});

			const target = await prisma.sophomoreDetails.findUnique({
				where: {
					id: sophomoreId
				},
				select: {
					verses: true
				}
			});

			const magicVerses = target?.verses;

			if (!magicVerses)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Target Magic Verses not found'
				});

			const result: boolean[] = [true, true, true];

			// Ensure the user only has 1 wild card
			const wildCards = answerVerses.filter((verse) => verse!.wildcard);
			if (wildCards.length > 1)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'The input has more than 1 wild cards'
				});

			// Override the freshmen answer with previous partially successful attempts
			const lastCast = await prisma.magicVerseCast.findFirst({
				where: {
					casterId: freshId,
					targetId: sophomoreId
				},
				include: {
					verses: true
				},
				orderBy: {
					create_at: 'desc'
				}
			});
			// Only override if the last attempt is found
			if (lastCast) {
				lastCast.verses.forEach((verse, index) => {
					// if the verse in {index} slot was successful last time, override it for this time
					if (lastCast.result[index]) {
						answerVerses[index] = { ...verse };
					}
				});
			}

			let isCorrect = true;
			let cost = 0;

			answerVerses.forEach((answer, index) => {
				if (answer?.wildcard) {
					// if Freshmen trigger wildcard
					// Don't mark the slot as correct yet, because it may be cached and remember as correct in long term
					// Charge the user
					cost += answer.cost;
				} else if (answer?.handler === magicVerses[index].handler) {
					// The user guessed correctly (first time or cache)
					result[index] = true;
				} else {
					// The user guessed incorrectly
					result[index] = false;
					isCorrect = false;
					cost += answer!.cost;
				}
			});

			// If the user guessed incorrectly, do not cache the wild card usage
			if (!isCorrect) {
				answerVerses.forEach((answer, index) => {
					if (answer?.wildcard) {
						result[index] = false;
					}
				});
			}

			// Check the user balance

			if (cost > (ctx.user?.balance ?? 0))
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Insufficient balance (Prediction)'
				});

			// Charge the user
			await freshmenController.decrementFreshmenBalance(
				{
					id: freshId
				},
				cost
			);

			// สร้าง cast record ว่าน้อง cast spell แล้วผลลัพธ์เป็นยังไง
			const res = await prisma.magicVerseCast.create({
				data: {
					casterId: freshId,
					result,
					targetId: sophomore?.id,
					verses: {
						connect: magicVerses
					}
				}
			});

			const freshmenPairInstance = await prisma.pair.findUnique({
				where: {
					freshmenDetailsId: freshId
				}
			});

			const correctPair = freshmenPairInstance?.sophomoreDetailsId === sophomore.id;

			if (correctPair) {
				await prisma.freshmenDetails.update({
					where: {
						id: freshId
					},
					data: {
						foundPair: true
					}
				});
			}

			return {
				payload: {
					...res,
					cost,
					isCorrect,
					correctPair: isCorrect ? correctPair : undefined,
					balanceLeft: (ctx.user?.balance ?? 0) - cost
				}
			};
		})
});
