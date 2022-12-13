import { useRouter } from "next/router";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import toast, { type Toast } from "react-hot-toast";
import urlSlug from "url-slug";

import clsx from "clsx";

import { trpc } from "@/utils/trpc";
import { Button } from "../Button";
import Input from "./Input";
import Spinner from "../Spinner";

const registerSchema = z.object({
  name: z.string(),
  priceOpen: z.coerce.number(),
  priceCompany: z.coerce.number(),
  website: z.string().url(),
  repository: z.string().url(),
  days: z.coerce.number(),
});

export type NewTrainingFormInput = z.TypeOf<typeof registerSchema>;

const successToast = () =>
  toast.custom((t) => (
    <div
      className={clsx(
        t.visible ? "animate-enter" : "animate-leave",
        "pointer-events-auto flex w-full max-w-md rounded bg-white shadow ring-1 ring-black ring-opacity-5"
      )}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <p className="text-sm font-medium text-green-700">
            New training added successfully.
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
      className={clsx(
        t.visible ? "animate-enter" : "animate-leave",
        "pointer-events-auto flex w-full max-w-md rounded bg-white shadow ring-1 ring-black ring-opacity-5"
      )}
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

export function NewTrainingForm() {
  const router = useRouter();
  const trainingUtils = trpc.useContext().training;

  const { isLoading, mutate: add } = trpc.training.add.useMutation({
    onSuccess: () => {
      successToast();
      trainingUtils.getAll.invalidate();
      router.push("/training/list");
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

  const methods = useForm<NewTrainingFormInput>({
    resolver: zodResolver(registerSchema),
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

  const onSubmitHandler: SubmitHandler<NewTrainingFormInput> = (values) => {
    // Execute mutation
    const { name, priceOpen, priceCompany, days, website, repository } = values;
    const slug = urlSlug(name);

    add({
      name: name,
      slug: slug,
      priceOpen: priceOpen,
      priceCompany: priceCompany,
      website: website,
      repository: repository,
      days: days,
    });
  };

  return (
    <>
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">New training</h1>
      </div>
      <div className="mt-8">
        <section aria-labelledby="new-training-date">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div className="grid grid-cols-4 gap-6">
                    <Input
                      label="Name"
                      name="name"
                      required={true}
                      classNames="col-span-4 sm:col-span-2"
                    />
                    <Input
                      label="Price Open"
                      name="priceOpen"
                      type="number"
                      required={true}
                      classNames="col-span-4 sm:col-span-2"
                    />
                    <Input
                      label="Website"
                      name="website"
                      type="url"
                      required={true}
                      classNames="col-span-4 sm:col-span-2"
                    />
                    <Input
                      label="Price Company"
                      name="priceCompany"
                      type="number"
                      required={true}
                      classNames="col-span-4 sm:col-span-2"
                    />
                    <Input
                      label="Repository"
                      name="repository"
                      type="url"
                      required={true}
                      classNames="col-span-4 sm:col-span-2"
                    />
                    <Input
                      label="# days"
                      name="days"
                      type="number"
                      required={true}
                      classNames="col-span-4 sm:col-span-2"
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
