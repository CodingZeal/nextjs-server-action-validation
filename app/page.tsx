import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className='text-2xl font-bold'>Home</h1>
      <p>Hey there mister DJ. <Link href='/contact' className='text-blue-700 underline'>Put a record on.</Link></p>
    </>
  )
}
