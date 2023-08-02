import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PlayerType } from 'database';

const scanQRDate = new Date();
const seeHintsDate = new Date(1692064800000);
const passcodeDate = new Date(1692064800000);
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
						title: 'แสกน QR Code',
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
						title: 'ให้น้องแสกน QR Code',
						href: '/qrgen'
					},
					hints: {
						activateDate: new Date(1970),
						title: 'ดูคำใบ้ที่ตัวเองกรอก',
						href: '/set-hints'
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

	return {
		homePageState,
		playerType: type,
		session,
		user
	};
};
