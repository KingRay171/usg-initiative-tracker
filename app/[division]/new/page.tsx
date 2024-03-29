import prisma from '@/lib/prisma'
import { cache } from 'react'
import Link from 'next/link';
import InitForm from '../../components/createinit'
import { validateRequest } from '@/auth'; 
import { redirect } from "next/navigation";

const getData = cache(async () => {
  const leaders = await prisma.user.findMany()
  return leaders
})

export default async function Home({params}:{params: {division: string}}) {
    const session = await validateRequest()
    if(!(session.session)) return redirect("/login")
    
    const leaders = await getData()
    
    return (
      
      <main className="min-h-screen flex flex-col items-center">

        <div className="mb-32 text-center w-[50vw] mb-0 ">
          <p>Create an Initiative</p>
          <InitForm leaders={leaders} />
          <Link href={`${params.division}`}>Back</Link>
        </div>
      </main>
    )
  }