import { Prisma } from "@prisma/client";

export type OrderWithCustomer = Prisma.OrderGetPayload<{
    include: {
        customer: true;
    }
}>