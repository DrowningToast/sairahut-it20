import { prisma } from '$lib/serverUtils';
import { createRouter } from '../context';
import { protectedReadyProcedure } from '../procedure';

export const profileRouter = createRouter({
	getMyProfile: protectedReadyProcedure.query(async ({ ctx }) => {
		const { user } = ctx;

		return user;
	}),
	getFactions: protectedReadyProcedure.query(async ({ ctx }) => {
		const factions = await prisma.factions.findMany({});
		return factions;
	})
});
