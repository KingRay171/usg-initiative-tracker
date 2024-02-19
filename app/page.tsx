import {cache} from 'react'
import prisma from '@/lib/prisma'

const getData = cache(async () => {
  const inits = await prisma.init.findMany({take: 3, orderBy: {createdAt: "desc"}})
  
  return inits
})

export default async function Home() {
  const inits = await getData()
  return (
    <main className=" min-h-screen">
      <section className='cover bg-bg1 bg-no-repeat bg-cover h-[80vh] w-screen'></section>

      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0">
        <p>Latest Initiatives:</p>
        <p>Academic Affairs:</p>
        {inits.map(e => (<div key={e.id}>{e.name}</div>))}
        
      </div>
    </main>
  )
}

