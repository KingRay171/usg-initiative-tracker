import Link from 'next/link'
import { getInitsForHome } from './queries'

export default async function Home() {
  const inits = await getInitsForHome()
  return (
    <main className="min-h-screen dark:bg-[#1B1D1E]">
      <section className='cover bg-bg1 bg-no-repeat bg-cover bg-blend-darken h-[80vh] w-screen flex flex-col items-center justify-center'><p className='text-wrap text-center opacity-100 text-6xl max-w-[25vw]'>CWRU USG INITIATIVE TRACKER</p></section>
      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0">
        <p>Latest Initiatives:</p>
        {inits.map(e => (<div key={e.id}><Link href={`/${e.type.toLowerCase()}/${e.id}`}>{e.name}</Link></div>))}
      </div>
    </main>
  )
}

