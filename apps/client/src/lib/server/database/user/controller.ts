import type { Prisma, PrismaClient } from 'database';

export const UserController = (prisma: PrismaClient) => {
	const updateOne = (user: Prisma.UserUpdateArgs) => {
		return prisma.user.update(user);
	};

	return {
		updateOne
	};
};
