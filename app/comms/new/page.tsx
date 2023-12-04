import Image from 'next/image'
import prisma from '@/lib/prisma'
import useSWR from 'swr'
import { cache, useEffect, useState } from 'react'
import Nav from '../../components/nav'
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
          <p>Create a Communications Initiative</p>
          <InitForm leaders={leaders} />
          <Link href={"/comms"}>Back</Link>
        </div>
      </main>
    )
  }