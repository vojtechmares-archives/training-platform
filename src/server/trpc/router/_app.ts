import { router } from "../trpc";
import { authRouter } from "./auth";
import { trainingRouter } from "./training";
import { trainingDateRouter } from "./trainingDate";
import { trainingDateAttendeeRouter } from "./trainingDateAttendee";


export const appRouter = router({
  training: trainingRouter,
  trainingDate: trainingDateRouter,
  trainingDateAttendee: trainingDateAttendeeRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
