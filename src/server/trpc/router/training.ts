import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const trainingRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.training.findMany();
  }),

  add: protectedProcedure
  .input(z.object({
    name: z.string(),
    priceOpen: z.number(),
    priceCompany: z.number(),
    website: z.string().url(),
    repository: z.string().url(),
    days: z.number(),
  }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.training.create({
      data: {
        name: input.name,
        priceOpen: input.priceOpen,
        priceCompany: input.priceCompany,
        website: input.website,
        repository: input.repository,
        days: input.days,
      }
    })
  })
});
