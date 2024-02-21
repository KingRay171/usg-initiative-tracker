import prisma from '@/lib/prisma'
import { cache } from 'react'
import Link from 'next/link';
import InitForm from '../../components/createinit'

const getData = cache(async () => {
  const leaders = await prisma.user.findMany()
  return leaders
})

export default async function Home() {
    const leaders = await getData()
    return (
      <main className="min-h-screen flex flex-col items-center">
        <div className="mb-32 text-center w-[50vw] mb-0 ">
          <p>Create a Diversity and Inclusion Initiative</p>
          <InitForm leaders={leaders} />
          <Link href={"/dni"}>Back</Link>
        </div>
      </main>
    )
  }