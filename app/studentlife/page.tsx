import Image from 'next/image'
import prisma from '@/lib/prisma'
import useSWR from 'swr'
import Init from '../components/init'
import Nav from '../components/nav'
import Link from 'next/link';
import {cache} from 'react'

const getData = cache(async () => {
  const itInits = await prisma.sl_init.findMany()
  return itInits
})

export default async function Home() {
  const itInits = await getData()
  return (
    
    <main className="py-8 min-h-screen">

      <div className="mb-32 text-center w-full mb-0">
        <h2 className="text-6xl">Student Life Initiatives:</h2>
        {itInits.map(e => (<Init key={e.id} info={e} />))}
        <Link href="/studentlife/new" className='border rounded-lg p-2'>Create an Initiative</Link>
      </div>
    </main>
  )
}

