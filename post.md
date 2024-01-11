# Using Zod for Form Validation with React Server Actions in Next.js

In this blog post, we will explore how to use [Zod](https://zod.dev/), a declarative JavaScript validation library, for form validation in a [Next.js](https://nextjs.org/) application. We will also discuss the importance of server-side validation and how to handle validation errors returned from the server.

## The Importance of Server-Side Validation

While client-side validation provides immediate feedback and improves user experience, server-side validation is a must for any application. It acts as a second line of defense against invalid or malicious data. Even if you augment your application with client-side validation, server-side validation is necessary to ensure data integrity and security.

## Overview of Zod Schema for Validation

Zod allows us to define a validation schema for our form data. This schema is a declarative way of specifying the validation rules for each field. For example, to mark a field as required, we can use the `min(1)` method, which specifies that the field must have a minimum length of 1.

Here's an example of a Zod schema:

```ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name cannot be blank"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message cannot be blank"),
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

In our client component, we consume this server response using the `useFormState` hook from react-dom. This hook allows us to manage the form state and handle validation errors.

We match the `path` node of each error object to the corresponding input field in our form. Then, we extract all `message` nodes to build the error message for each field. This way, we can display specific error messages next to each field, providing clear feedback to the user.

In conclusion, Zod provides a powerful and flexible way to handle form validation in a Next.js application. By combining it with server-side actions and the `useFormState` hook, we can create robust forms with clear and specific error messages.
