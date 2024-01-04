import contactAction, { getConfig } from './server-action'
import Form from './form'

export default async function Contact() {
  const config = await getConfig()

  return (
    <>
      <h1 className='text-2xl font-bold mb-3'>Contact Us</h1>
      <Form config={config} action={contactAction}></Form>
    </>
  )
}
