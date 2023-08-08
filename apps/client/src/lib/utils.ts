// ONLY CLIENT SIDE CODE HERE

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
// import type { PrismaClient } from 'database';
// import { client } from 'database/client';
// import { NODE_ENV } from '$env/static/public';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || client;

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const determineYear = (email: string) => {
	const year = parseInt(email[0] + email[1]);
	return year - 45;
};
