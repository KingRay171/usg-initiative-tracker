import prisma from '@/lib/prisma'
import { cache } from 'react'
import Link from 'next/link';
import InitForm from '../../components/createinit'

const getData = cache(async () => {
  const leaders = await prisma.leader.findMany()
  return leaders
})

export default async function Home() {
    const leaders = await getData()
    return (
      
      <main className="min-h-screen flex flex-col items-center">

        <div className="mb-32 text-center w-[50vw] mb-0 ">
          <p>Create a Student Life Initiative</p>
          <InitForm leaders={leaders} />
          <Link href={"/studentlife"}>Back</Link>
        </div>
      </main>
    )
  }