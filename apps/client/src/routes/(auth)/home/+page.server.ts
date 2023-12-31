import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PlayerType } from 'database';
import { prisma } from '$lib/serverUtils';

const scanQRDate = new Date();
const seeHintsDate = new Date();
const passcodeDate = new Date();
const profileDate = new Date();

export interface CardState {
	title: string;
	activateDate: Date;
	href: string;
}

export interface HomePageState {
	qrCode: CardState;
	hints: CardState;
	passcode: CardState;
	profile: CardState;
}

export const load: PageServerLoad = async ({ locals }) => {
	const { user, session } = locals;

	// commented for testing reasons

	// Check if the hints are ready?
	if (user?.type === 'SOPHOMORE' && !user.sophomoreDetails?.hintsReady) {
		throw redirect(307, '/set-hints');
	}

	// check if the user is freshmen and still haven't registered
	if (user?.type === 'FRESHMEN' && !user.freshmenDetails) {
		throw redirect(307, '/regis');
	}

	// check if the this or that is set?
	if (!(user?.sophomoreDetails?.thisOrThatReady || user?.freshmenDetails?.thisOrThatReady)) {
		throw redirect(307, '/this-or-that');
	}

	// if all check pass, check if the user is freshmen or sophomore
	const type: PlayerType = user.type;
	const homePageState: HomePageState =
		type === 'FRESHMEN'
			? {
					qrCode: {
						activateDate: scanQRDate,
						title: 'สแกน QR Code',
						href: '/scan-qr'
					},
					hints: {
						activateDate: seeHintsDate,
						title: 'ดูคำใบ้ ตามหาภูตของตัวเอง!',
						href: '/hints'
					},
					passcode: {
						activateDate: passcodeDate,
						title: 'กรอกรหัสเพื่อรับคำใบ้',
						href: '/enter-passcode'
					},
					profile: {
						activateDate: profileDate,
						title: 'บัตรประจำตัว',
						href: '/profile'
					}
			  }
			: {
					qrCode: {
						activateDate: scanQRDate,
						title: 'ให้น้องสแกน QR Code',
						href: '/qrgen'
					},
					hints: {
						activateDate: new Date(1970),
						title: 'ดูความคืบหน้าของคำใบ้ตัวเอง',
						href: '/hints-status'
					},
					passcode: {
						activateDate: passcodeDate,
						title: 'ให้น้องกรอก Passcode',
						href: '/passcode-gen'
					},
					profile: {
						activateDate: profileDate,
						title: 'บัตรประจำตัว',
						href: '/profile'
					}
			  };

	let hasPair = false;
	if (type === 'SOPHOMORE') {
		hasPair = !!(await prisma.pair.findFirst({
			where: {
				sophomoreDetailsId: user.sophomoreDetails?.id
			}
		}));
	} else if (type === 'FRESHMEN') {
		hasPair = !!(await prisma.pair.findFirst({
			where: {
				freshmenDetailsId: user.freshmenDetails?.id
			}
		}));
	}

	return {
		homePageState,
		playerType: type,
		session,
		user,
		hasPair,
		vip: user.freshmenDetails?.vip,
		easterEgg: user.freshmenDetails?.easterEgg
	};
};
