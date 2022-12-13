import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const trainingDateRouter = router({
  getById: publicProcedure
  .input(z.object({ id: z.string().uuid() }))
  .query(({ctx, input}) => {
    return ctx.prisma.trainingDate.findUnique({
      where: { id: input.id },
      include: { training: true },
    })
  }),

  getDatesForTraining: publicProcedure
  .input(z.object({ trainingId: z.string().uuid() }))
  .query(({ ctx, input }) => {
    return ctx.prisma.trainingDate.findMany({
      where: {
        trainingId: input.trainingId
      },
      orderBy: {
        date: 'asc'
      },
      include: {
        attendees: true,
      },
    })
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.trainingDate.findMany({
      include: {
        training: true,
        attendees: true,
      },
      orderBy: {
        date: 'asc',
      }
    });
  }),

  add: publicProcedure
  .input(z.object({
    trainingId: z.string().uuid(),
    date: z.date(),
    location: z.string(),
    capacity: z.number()
  }))
  .mutation(async ({ctx, input}) => {
    // Dates for given training
    const dates = await ctx.prisma.trainingDate.findMany({
      where: { trainingId: input.trainingId }
    })

    const found = dates.find((d) => { return d.date == input.date })

    if (found === undefined) {
      throw new Error('A training date already exists.')
    }

    return ctx.prisma.trainingDate.create({
      data: {
        trainingId: input.trainingId,

        date: input.date,
        location: input.location,
        capacity: input.capacity,
      },
    })
  })
});
