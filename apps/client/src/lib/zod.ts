import { z } from 'zod';

export const freshmenRegister = z.object({
	branch: z.enum(['IT', 'DSBA', 'BIT', 'AIT']),
	first_name: z.string().min(1),
	last_name: z.string().min(1),
	nickname: z.string().min(1),
	title: z.enum(['MR', 'MRS']),
	phone: z.string().length(10),
	instagram_link: z.string().url().optional(),
	facebook_link: z.string().url().optional()
});

export type FreshmenRegister = z.infer<typeof freshmenRegister>;
