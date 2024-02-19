import prisma from '@/lib/prisma'
import Init from '../components/init'
import Link from 'next/link';
import {cache} from 'react'
import { InitType } from '@prisma/client';

const getData = cache(async () => {
  const itInits = await prisma.init.findMany({where: {type: InitType.DI}})
  return itInits
})

export default async function Home() {
  const itInits = await getData()
  return (
    <main className="py-8 min-h-screen">
      <div className="mb-32 text-center w-full mb-0">
        <h2 className="text-6xl">Diversity and Inclusion Initiatives:</h2>
        <div className='grid grid-cols-5 gap-4'>
          {itInits.map(e => (<Init key={e.id} info={e} />))}
        </div>
        <Link href="/dni/new" className='border rounded-lg p-2'>Create an Initiative</Link>
      </div>
    </main>
  )
}

