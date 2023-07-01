import { PrismaClient } from "@prisma/client";

import env from "env";

export const client = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
