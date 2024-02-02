# How to Use Zod for Form Validation with React Server Actions in Next.js

Server-side validation is a critical line of defense against invalid and malicious data, and ensures data integrity and security. In this post, we will explore how to use [Zod](https://zod.dev/), a declarative JavaScript validation library, for server-side form validation in a [Next.js](https://nextjs.org/) application. We will also look into to handling validation errors returned from the server.

## Sample Application

This article assumes you're acquainted with setting up and running Next.js applications.

To view the code referenced in this article, checkout the [repo](https://github.com/CodingZeal/nextjs-server-action-validation).

This article and accompanying example application utilize Next.js version 14.x configured with TailwindCSS and TypeScript.

## Overview of Zod Schema for Validation

Zod allows us to define a validation schema for our form data. This schema is a declarative way of specifying the validation rules for each field. For example, to mark a field as required, we can use the `min(1)` method, which specifies that the field must have a minimum length of 1. The 2nd argument is optional and can be used to override the default error message.

Zod has many validation methods for different data types and scenarios. You can use the `email()` method to validate an email address, or `url()` to validate a URL. Also, if you have custom needs, you can always use `regex()` to validate against a regular expression.

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

Now let's look at how we can implement this in our Next.js application. We'll start with the server action, then move on to the contact page, and finally the form component.

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

In our contact page, we import the server action and pass it to the `Form` component. The `ContactPage` is a [server component](https://nextjs.org/docs/app/building-your-application/rendering/server-components) while the `Form` component is a [client component](https://nextjs.org/docs/app/building-your-application/rendering/client-components). We need to use the `useFormState` hook to handle validation errors coming from the server. The `useFormState` hook can only be used in client components.

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

In our form component, we'll use the `useFormState` hook to handle validation errors. We can then match the `path` node of each error object in the form state to its corresponding input field, and extract all the `message` nodes to build an error message for each field.

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

## Wrapping it Up

Zod provides a powerful and flexible way to handle form validation in Next.js applications. Using Zod, you can implement server-side validation to our forms and still present a great user experience by following a few simple steps:

- Define a Zod schema for each server action
- Validate user input in your server action using the Zod schema
- Return an array of errors if validation fails
- In your client component, use the `useFormState` hook to receive validation errors
- Display the validation errors to the user

Now go build some great forms!
