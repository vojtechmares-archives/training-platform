import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import toast, { type Toast } from "react-hot-toast";

import { trpc } from "@/utils/trpc";
import { Button } from "../Button";
import Input from "./Input";
import Spinner from "../Spinner";

type NewDateFormProps = { trainingId: string };

const registerSchema = z.object({
  trainingId: z.string().uuid(),
  date: z.coerce.date().min(new Date(), "Date must be in the future"),
  location: z.string(),
  capacity: z.coerce
    .number()
    .min(4, "Minimum capacity is 4")
    .max(16, "Maximum capacity is 16"),
});

export type NewDateFormInput = z.TypeOf<typeof registerSchema>;

const successToast = () =>
  toast.custom((t: Toast) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded bg-white shadow ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <p className="text-sm font-medium text-green-700">
            New date added successfully.
          </p>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  ));

const errorToast = (errorMessage?: string) =>
  toast.custom((t: Toast) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded bg-white shadow ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex-1 items-start">
          <p className="text-sm font-medium text-red-700">
            Error! Date was not saved.
          </p>
          <p className="mt-1 text-sm font-normal text-red-700">
            {errorMessage}
          </p>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  ));

export function NewDateForm({ trainingId }: NewDateFormProps) {
  const trainingDateUtils = trpc.useContext().trainingDate;
  const { isLoading, mutate: add } = trpc.trainingDate.add.useMutation({
    onSuccess: () => {
      successToast();
      trainingDateUtils.getDatesForTraining.invalidate();
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

  // registerSchema.default({
  //     trainingId: trainingId,
  //     date: new Date(),
  //     location: 'Prague',
  //     capacity: 12,
  // })

  const methods = useForm<NewDateFormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      trainingId: trainingId,
      date: new Date(),
      location: "Prague",
      capacity: 12,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<NewDateFormInput> = (values) => {
    // Execute mutation
    add(values);
  };

  return (
    <>
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">New date</h1>
      </div>
      <div className="mt-8">
        <section aria-labelledby="new-training-date">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-3">
                    <Input name="trainingId" type="hidden" value={trainingId} />
                    <Input
                      label="Date"
                      name="date"
                      type="date"
                      required={true}
                    />
                    <Input label="Location" name="location" required={true} />
                    <Input
                      label="Capacity"
                      name="capacity"
                      type="number"
                      required={true}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <Button color="blue" type="submit">
                    {isLoading ? (
                      <>
                        <Spinner />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </section>
      </div>
    </>
  );
}
