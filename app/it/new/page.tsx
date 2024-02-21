import prisma from '@/lib/prisma'
import { cache } from 'react'
import Link from 'next/link';
import InitForm from '../../components/createinit'
import { auth } from "../../../auth"
const getData = cache(async () => {
  const leaders = await prisma.user.findMany()
  console.log(leaders)
  return leaders
})

export default async function Home() {
    const session = await auth()
    if(!session) return <></>
    
    const leaders = await getData()
    
    return (
      
      <main className="min-h-screen flex flex-col items-center">

        <div className="mb-32 text-center w-[50vw] mb-0 ">
          <p>Create an IT Initiative</p>
          <InitForm leaders={leaders} />
          <Link href={"/it"}>Back</Link>
        </div>
      </main>
    )
  }