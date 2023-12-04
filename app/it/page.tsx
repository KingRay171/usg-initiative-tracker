import prisma from '@/lib/prisma'
import Init from '../components/init'
import Link from 'next/link';
import {cache} from 'react'

const getData = cache(async () => {
  const itInits = await prisma.it_init.findMany()
  return itInits
})

export default async function Home() {
  const itInits = await getData()
  return (
    <main className="py-8 min-h-screen">
      <div className="mb-32 text-center w-full mb-0">
        <h2 className="text-6xl">IT Initiatives:</h2>
        {itInits.map(e => (<Init key={e.id} info={e} />))}
        <Link href="/it/new" className='border rounded-lg p-2'>Create an Initiative</Link>
      </div>
    </main>
  )
}

