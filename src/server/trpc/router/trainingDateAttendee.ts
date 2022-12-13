import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const trainingDateAttendeeRouter = router({
  getSignUpsFromLast30Days: protectedProcedure.query(({ ctx }) => {
    const date = new Date()
    date.setDate(date.getDate() - 30)
    const ago = date.toISOString().split("T")[0] // "YYYY-MM-DD"

    return {
      attendees: ctx.prisma.trainingDateAttendee.findMany({
        where: {
          createdAt: {
            gte: ago,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    };
  }),

  signUpToDate: protectedProcedure
  .input(z.object({
    trainingDateId: z.string().uuid(),
    contactInfo: z.object({
      name: z.string(),
      email: z.string().email(),
      company: z.string().nullish()
    })
  }))
  .mutation(async ({ctx, input}) => {
    const newAttendee = await ctx.prisma.trainingDateAttendee.create({
      data: {
        name: input.contactInfo.name,
        email: input.contactInfo.email,
        company: input.contactInfo.company,
        trainingDateId: input.trainingDateId,
      }
    })

    return newAttendee
  }),

  getAttendeesForTrainingDate: protectedProcedure
  .input(z.object({trainingDateId: z.string().uuid() }))
  .query(({ctx, input}) => {
    return ctx.prisma.trainingDateAttendee.findMany({
      where: { trainingDateId: input.trainingDateId },
      orderBy: { createdAt: 'desc' },
    })
  }),
});
