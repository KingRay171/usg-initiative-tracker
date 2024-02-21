import prisma from '@/lib/prisma'
import Init from '../components/init'
import Link from 'next/link';
import {cache} from 'react'
import { InitType } from '@prisma/client';

const getData = cache(async () => {
  const itInits = await prisma.init.findMany({where: {type: InitType.SL}})
  return itInits
})

export default async function Home() {
  const itInits = await getData()
  return (
    
    <main className="py-8 min-h-screen">

      <div className="mb-32 text-center w-full mb-0">
        <h2 className="text-6xl">Student Life Initiatives:</h2>
        <div>
          {itInits.map(e => (<Init key={e.id} info={e} />))}
        </div>
        <Link href="/studentlife/new" className='border rounded-lg p-2'>Create an Initiative</Link>
      </div>
    </main>
  )
}

