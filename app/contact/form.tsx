'use client'

import { useFormState } from 'react-dom'

type Props = {
  action: (_prevState: any, params: FormData) => {},
  config: {
    message: {
      min: number,
      max: number
    }
  },
}
export default function Form({ action, config}: Props) {
  const [ state, formAction ] = useFormState(action, {})

  console.log(state)
  return (
    <>
      <form className='flex flex-col items-start gap-4 w-full md:gap-5' action={formAction}>
        <div className='flex flex-col w-full gap-4 md:flex-row md:gap-5'>
          <label htmlFor='name' className='flex flex-col w-full'>
            <span className='mr-2'>Name</span>
            <input id='name' type='text' name='name' className='border-black border-2' />
          </label>
          <label htmlFor='email' className='flex flex-col w-full'>
            <span className='mr-2'>Email</span>
            <input id='email' type='text' name='email' className='border-black border-2' />
          </label>
        </div>
        <label htmlFor='message' className='flex flex-col w-full'>
          <span className='mr-2'>Which record should we play for you? <span className='text-xs'>(min {config.message.min} characters, max {config.message.max} characters)</span></span>
          <textarea id='message' name='message' className='border-black border-2 min-h-20' />
        </label>
        <button className='cursor-pointer bg-green-400 border-2 border-black text-black p-4 uppercase font-bold hover:bg-yellow-300 hover:text-black'>Mix that Tape</button>
      </form>
    </>
  )
}