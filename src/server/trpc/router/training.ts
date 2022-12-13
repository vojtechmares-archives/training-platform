import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const trainingRouter = router({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.training.findUnique({
        where: { slug: input.slug },
      })
    }
  ),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.training.findMany();
  }),

  add: publicProcedure
  .input(z.object({
    name: z.string(),
    slug: z.string(),
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
        slug: input.slug,
        priceOpen: input.priceOpen,
        priceCompany: input.priceCompany,
        website: input.website,
        repository: input.repository,
        days: input.days,
      }
    })
  })
});
