import Link from 'next/link';
import React from 'react';

export default function Header() {

  return(
    <div className='w-full h-min p-2 flex flex-row gap-x-10 border-b border-black/50 mb-5'>
      <p className='pl-5 pr-10 text-xl'>HeafFlow</p>
      <Link href='/dashboard' className='my-auto'>Dashboard</Link>
      <Link href='/goals' className='my-auto'>Goals</Link>
      <Link href='/trends' className='my-auto'>Trends</Link>
    </div>
  );
}
