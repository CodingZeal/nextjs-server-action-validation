"use client";

import { useCallback } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { ZodIssue } from "zod";

type Props = {
  action: (_prevState: any, params: FormData) => { errors: ZodIssue[] };
  config: {
    message: {
      min: number;
      max: number;
    };
  };
};

export default function Form({ action, config }: Props) {
  const [state, formAction] = useFormState(action, { errors: [] });
  const findErrors = useCallback(
    (fieldName: string) => {
      return state.errors
        .filter((item) => {
          return item.path.includes(fieldName);
        })
        .map((item) => item.message);
    },
    [state.errors]
  );
  const nameErrors = findErrors("name");
  const emailErrors = findErrors("email");
  const messageErrors = findErrors("message");

  return (
    <>
      <form
        className="flex flex-col items-start gap-4 w-full md:gap-5"
        action={formAction}
      >
        <div className="flex flex-col w-full gap-4 md:flex-row md:gap-5">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="flex flex-col w-full">
              <span className="mr-2">Name</span>
              <input
                id="name"
                type="text"
                name="name"
                className="border-black border-2"
              />
            </label>
            <ErrorMessages errors={nameErrors} />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="flex flex-col w-full">
              <span className="mr-2">Email</span>
              <input
                id="email"
                type="text"
                name="email"
                className="border-black border-2"
              />
            </label>
            <ErrorMessages errors={emailErrors} />
          </div>
        </div>

        <label htmlFor="message" className="flex flex-col w-full">
          <span className="mr-2">
            Which record should we play for you?{" "}
            <span className="text-xs">
              (min {config.message.min} characters, max {config.message.max}{" "}
              characters)
            </span>
          </span>
          <textarea
            id="message"
            name="message"
            className="border-black border-2 min-h-20"
          />
        </label>
        <ErrorMessages errors={messageErrors} />

        <SubmitButton />
      </form>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  const text = pending ? "Let the beat drop..." : "Mix that Tape";

  return (
    <button
      disabled={pending}
      className="bg-green-400 border-2 border-black cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 disabled:border-gray-500 font-bold hover:bg-yellow-300 hover:text-black p-4 text-black uppercase"
    >
      {text}
    </button>
  );
};

const ErrorMessages = ({ errors }: { errors: string[] }) => {
  const text = errors.join(", ");

  return <div className="text-red-600">{text}</div>;
};
