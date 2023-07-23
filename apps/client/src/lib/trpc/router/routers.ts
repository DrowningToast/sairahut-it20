import { createTRPCRouter, t } from '../procedure';
import { hintRouter } from './hint';
import { exampleRouter } from './example';

export const routers = createTRPCRouter({
	example: exampleRouter,
	hint: hintRouter
});
