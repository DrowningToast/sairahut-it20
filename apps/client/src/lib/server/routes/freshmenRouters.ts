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
			take: 8
		});

		const AMOUNT_THRESHOLD = 6;

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
			// find qr code that scanned
			const { user } = ctx;

			const qrRes = await prisma.magicVerseIdentificationInstance.findUnique({
				where: {
					content: qrCodeContent
				}
			});

			if (!qrRes) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: `QR Code with code: "${qrCodeContent}" not found.`
				});
			}

			const freshmenId = user?.freshmenDetails?.id;
			if (!freshmenId)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'FRESHMEN ID NOT FOUND'
				});

			await prisma.magicVerseIdentificationInstance.update({
				data: {
					isExpired: true
				},
				where: {
					id: qrRes.id
				}
			});

			let spells = 0;

			const beforeFriday = new Date();
			beforeFriday.setFullYear(2023, 7, 19);

			const logs = await prisma.qRInstances.count({
				where: {
					AND: {
						ownerId: qrRes?.sophomoreDetailsId,
						scannedBy: {
							every: {
								id: freshmenId
							}
						},
						create_at: {
							lt: beforeFriday
						}
					}
				}
			});

			if (logs !== 0) {
				spells++;
			}

			const sophomore = await SophomoreDetailsController(prisma).findUnique({
				id: qrRes?.sophomoreDetailsId
			});

			const freshmenBalance = user?.balance as number;
			const sophomoreBalance = sophomore?.user.balance as number;

			if (freshmenBalance >= sophomoreBalance) {
				spells++;
			}

			const magicVerses = await prisma.magicVerses.findMany({
				where: {
					sophomores: {
						every: {
							id: sophomore?.id
						}
					}
				}
			});

			const randomVerses = [];

			for (let i = 0; i < spells; i++) {
				const rando = shuffle(magicVerses);
				randomVerses.push(rando[0]);
			}

			// กัสฝากดูที มันแดงอยู่
			await prisma.magicVerseCast.create({
				data: {
					casterId: freshmenId,
					verses: {
						connect: [randomVerses[0], randomVerses[1]]
					}
				}
			});

			// กัสฝากทำตรงนี้ที ตรงที่ส่ง randomVerse ไปที่ user ที่หน้าบ้าน
			return {
				success: true,
				payload: randomVerses
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
					update_at: 'desc'
				},
				where: {
					casterId: user?.freshmenDetails?.id,
					verses: {
						every: {
							sophomores: {
								every: {
									id: sophomoreId
								}
							}
						}
					}
				}
			});

			return {
				success: true,
				payload: {
					lastCast: res || new Array<MagicVerseCast>(3)
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
			const freshmenDetailsId = user?.freshmenDetails?.id as string;

			// หา verses ของ sophomore
			const sophomore = await sophomoreController.findUnique({ id: sophomoreId });
			const magicVerses = await prisma.magicVerses.findMany({
				where: {
					sophomores: {
						every: {
							id: sophomore?.id
						}
					}
				}
			});

			const result: boolean[] = [];

			let balanceDecrement = 0;

			// Loop through Sophomore's verse
			magicVerses.forEach(async (verse, index) => {
				if (verse.wildcard) {
					// if Freshmen trigger wildcard
					result.push(true);
					balanceDecrement += verse.cost;
				} else if (verse.handler === answer[index]) {
					// if Freshmen trigger correct verse at this index
					result.push(true);
				} else {
					// if Freshmen fail to trigger correct verse
					result.push(false);
					balanceDecrement += verse.cost;
				}
			});

			await freshmenController.decrementFreshmenBalance(
				{
					id: freshmenDetailsId
				},
				balanceDecrement
			);

			// สร้าง cast record ว่าน้อง cast spell แล้วผลลัพธ์เป็นยังไง
			const res = await prisma.magicVerseCast.create({
				data: {
					casterId: freshmenDetailsId,
					result,
					verses: {
						connect: magicVerses
					}
				}
			});

			return {
				success: true,
				payload: res
			};
		})
});
