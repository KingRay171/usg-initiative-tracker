import Link from 'next/link'
import { getInitsForHome } from './queries'
import { Suspense } from 'react'


export default async function Home() {
  return (
    <main className="min-h-screen dark:bg-[#1B1D1E]">
      <Suspense>
      <section className='cover bg-bg1 bg-no-repeat bg-cover bg-blend-darken h-[80vh] w-screen flex flex-col items-center justify-center'>
        <p className='text-wrap text-center opacity-100 text-[5vw] max-w-[25vw]'>CWRU USG INITIATIVE TRACKER</p>
      </section>
      </Suspense>
      <Suspense>
      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0">
        <p>Latest Initiatives:</p>
        {(await getInitsForHome()).map(e => (<div key={e.id}><Link href={`/${e.type.toLowerCase()}/${e.id}`}>{e.name}</Link></div>))}
      </div>
      </Suspense>
    </main>
  )
}

