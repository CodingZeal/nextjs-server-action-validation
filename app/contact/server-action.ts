'use server'

import { redirect } from 'next/navigation'


export default async function contactAction(data: FormData) {
  await console.log(data.get('email'))
  redirect('/')
}
