import { createRouter, t } from '../context';
import { freshmenProcedure, oldProcedure, protectedProcedure } from '../procedure';

export const versesRouter = createRouter({
	// Returns a identification data, create a new one if the old one is marked as expired
	getID: oldProcedure.query(async () => {
		return 'OK';
	}),
	// Return info of the sophomore (owner)
	//
	verifyId: freshmenProcedure.query(async () => {
		return 'OK';
	})
	//
});
