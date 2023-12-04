import Image from 'next/image'
import { PrismaClient, it_init } from '@prisma/client'
import { useEffect, useState } from 'react'
import Nav from './components/nav'
import {cache} from 'react'

const getData = cache(async () => {
  const acadaffairs_inits = await prisma.acadaffairs_init.findMany({take: 3, orderBy: {createdAt: "desc"}})
  const comms_inits = await prisma.comms_init.findMany({take: 3, orderBy: {createdAt: "desc"}})
  const di_inits = await prisma.di_init.findMany({take: 3, orderBy: {createdAt: "desc"}})
  const it_inits = await prisma.it_init.findMany({take: 3, orderBy: {createdAt: "desc"}})
  const sl_inits = await prisma.sl_init.findMany({take: 3, orderBy: {createdAt: "desc"}})
  return {acadaffairs_inits, comms_inits, di_inits, it_inits, sl_inits}
})

export default async function Home() {
  const {acadaffairs_inits, comms_inits, di_inits, it_inits, sl_inits} = await getData()
  return (
    <main className=" min-h-screen">
      <section className='cover bg-bg1 bg-no-repeat bg-cover h-[80vh] w-screen'></section>

      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0">
        <p>Latest Initiatives:</p>
        <p>Academic Affairs:</p>
        {acadaffairs_inits.map(e => (<div key={e.id}>{e.name}</div>))}
        <p>Communications:</p>
        {comms_inits.map(e => (<div key={e.id}>{e.name}</div>))}
        <p>Diversity and Inclusion:</p>
        {di_inits.map(e => (<div key={e.id}>{e.name}</div>))}
        <p>Information Technology:</p>
        {it_inits.map(e => (<div key={e.id}>{e.name}</div>))}
        <p>Student Life:</p>
        {sl_inits.map(e => (<div key={e.id}>{e.name}</div>))}
      </div>
    </main>
  )
}

