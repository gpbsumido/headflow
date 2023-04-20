import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='w-full h-full flex justify-center'>
      
      <div className='my-auto h-min flex flex-col gap-y-5'>
        <h1 className='h-min w-min whitespace-nowrap text-3xl mx-auto'>
          {`Paul's Health App`}
        </h1>
        
        <Link
          className='h-min mx-auto'
          href='/health'
        >
          <button
          className='rounded-lg border p-2'
          >
            Health App
          </button>
        </Link>
      </div>

    </div>
  )
}
