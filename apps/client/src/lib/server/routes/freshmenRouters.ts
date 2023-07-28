import { z } from "zod";
import { createRouter } from "../context";
import { protectedProcedure } from "../procedure";
import { prisma } from "$lib/serverUtils";

export const freshmenRouters = createRouter({
    submitScannedQR: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            const { user } = ctx;

            const data = await prisma.qRInstances.findUnique({
                where: {
                    id: input
                }
            })

            if (!data) {
                return { message: `QR Instance with ID: ${input} not found.` }
            } else if (data.scannedById) {
                return { message: `QR Instance with ID: ${input} already scanned.` }
            }

            await prisma.qRInstances.update({
                where: {
                    id: input
                },
                data: {
                    scannedById: user?.freshmenDetailsId,
                }
            })

            return 'OK'
        })
})