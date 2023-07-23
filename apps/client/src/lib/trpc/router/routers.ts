import { t } from '../procedure';
import { exampleRouter } from './example';
import { hintRouter } from './hint';

export const createTRPCRouter = t.router;

export const routers = createTRPCRouter({
	exampleRouter,
	hintRouter
});
