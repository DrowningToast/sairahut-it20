// See https://kit.svelte.dev/docs/types#app
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

import type { Session } from '@auth/core/types';
import type {
	Factions,
	FreshmenDetails,
	HintSlugs,
	Hints,
	Prisma,
	SophomoreDetails,
	User
} from 'database';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session | null;
			user:
				| (User & {
						faction?: Factions | null;
						sophomoreDetails?:
							| SophomoreDetails
							| null;
						freshmenDetails?: FreshmenDetails | null;
				  })
				| null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
