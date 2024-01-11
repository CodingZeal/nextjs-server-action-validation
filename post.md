# Using Zod for Form Validation with React Server Actions in Next.js

In this blog post, we will explore how to use [Zod](https://zod.dev/), a declarative JavaScript validation library, for form validation in a [Next.js](https://nextjs.org/) application. We will also discuss the importance of server-side validation and how to handle validation errors returned from the server.

## Sample Application

This article assumes you're acquainted with setting up and running Next.js applications.

To view the code referenced in this article, checkout the [repo](https://github.com/CodingZeal/nextjs-server-action-validation).

This article and accompanying example application utilize Next.js version 14.x configured with TailwindCSS and TypeScript.

## The Importance of Server-Side Validation

While client-side validation provides immediate feedback and improves user experience, server-side validation is a must for any application. It acts as a second line of defense against invalid or malicious data. Even if you augment your application with client-side validation, server-side validation is necessary to ensure data integrity and security.

## Overview of Zod Schema for Validation

Zod allows us to define a validation schema for our form data. This schema is a declarative way of specifying the validation rules for each field. For example, to mark a field as required, we can use the `min(1)` method, which specifies that the field must have a minimum length of 1.

Here's an example of a Zod schema definition:

```ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name cannot be blank"),
  email: z.string().email("Invalid email address"),
});
```

## Handling Server-Side Validation Errors

When we submit our form, the server-side action validates the form data against the Zod schema. If the validation fails, the server returns an array of errors (`ZodIssue[]`). Each error object has the following structure:

```json
{
  "code": "too_small",
  "minimum": 1,
  "type": "string",
  "inclusive": true,
  "exact": false,
  "message": "Name cannot be blank",
  "path": ["name"]
}
```

Now, let's look at how we can implement this in our Next.js application. We'll start with the server action, then move on to the contact page, and finally the form component.

## Server Action

In our server action, we validate the form data using the Zod schema. If the validation fails, we return the array of errors. If the validation succeeds, we redirect the user to the home page.

```ts
// app/contact/server-action.ts
"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name cannot be blank"),
  email: z.string().email().min(1, "Email cannot be blank"),
});

export default async function contactAction(_prevState: any, params: FormData) {
  const validation = schema.safeParse({
    name: params.get("name"),
    email: params.get("email"),
  });

  if (validation.success) {
    // save the data, send an email, etc.
    redirect("/");
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}
```

## Contact Page

In our contact page, we import the server action and pass it to the `Form` component. The `ContactPage` is a server component while the `Form` component is a client component. We need to use the `useFormState` hook to handle validation errors coming from the server. The `useFormState` hook can only be used in client components.

```tsx
// app/contact/page.tsx
import contactAction from "./server-action";
import Form from "./form";

export default async function ContactPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-3">Contact Us</h1>
      <Form action={contactAction}></Form>
    </>
  );
}
```

## Form Component

In our form component, we use the `useFormState` hook to handle validation errors. We match the `path` node of each error object to the corresponding input field and extract all `message` nodes to build the error message for each field.

```tsx
// app/contact/form.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { ZodIssue } from "zod";

type Props = {
  action: (
    _prevState: any,
    params: FormData
  ) => Promise<{ errors: ZodIssue[] }>;
};

export default function Form({ action }: Props) {
  const [state, formAction] = useFormState(action, { errors: [] });
  console.log(state);
  const nameErrors = findErrors("name", state.errors);
  const emailErrors = findErrors("email", state.errors);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">
          <span>Name</span>
          <input id="name" type="text" name="name" />
        </label>
        <ErrorMessages errors={nameErrors} />
      </div>

      <div>
        <label htmlFor="email">
          <span>Email</span>
          <input id="email" type="text" name="email" />
        </label>
        <ErrorMessages errors={emailErrors} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

const ErrorMessages = ({ errors }: { errors: string[] }) => {
  if (errors.length === 0) return null;

  const text = errors.join(", ");

  return <div className="text-red-600 peer">{text}</div>;
};

const findErrors = (fieldName: string, errors: ZodIssue[]) => {
  return errors
    .filter((item) => {
      return item.path.includes(fieldName);
    })
    .map((item) => item.message);
};
```

In conclusion, Zod provides a powerful and flexible way to handle form validation in a Next.js application. By combining it with server-side actions and the `useFormState` hook, we can create robust forms with clear and specific error messages.
