@workspace tell me about the contact page

---

As an expert javascript/typescript and nextjs expert software developer
with technical writing skills, can you help me write a blog post using this code workspace?

Objective: using Zod for form validation with react server actions in Nextjs

some details worth including:

- server side validation is a must, even if you agument with client side validation
- overview of zod schema for validation
  - note that a 'required' field is accomplished using `min(1)`
- validation is returned from the server action as a response and consumed in the client component using `useFormState` hook
  - the server response is an array of errors (`ZodIssue[]`), each item has the below structure

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

- we match the `path` node to each input field and extract all `message` nodes to build the error message

-- after first post

Can you rewrite that blog post but after the example ZodIssue example json I want to include the full code for contact directory; server action, followed by the contact page and then the form component, explain as much of each as needed

-- did not go well, was not writting proper code but also was not explicity saying it was referencing anything except this file

-- added code manually
