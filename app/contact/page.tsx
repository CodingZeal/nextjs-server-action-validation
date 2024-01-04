import contactAction from "./server-action"
export default function Contact() {
  return (
    <>
      <h1 className='text-2xl font-bold mb-8'>Contact Us</h1>
      <form className='flex flex-col items-start gap-4' action={contactAction}>
        <label htmlFor='email'>
          <span className='mr-2'>Email</span>
          <input id='email' type='text' name='email' className='border-black border-2' />
        </label>
        <button>Mix that Tape</button>
      </form>
    </>
  )
}
