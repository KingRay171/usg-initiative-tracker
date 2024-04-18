import prisma from '@/lib/prisma'
import Init from '../components/init'
import Link from 'next/link';
import {cache} from 'react'
import { InitType } from '@prisma/client';

const getData = cache(async (div: InitType) => {
  const inits = await prisma.init.findMany({where: {type: div}})
  return inits
})

export default async function Home({params}:{params: {division: string}}) {
  const divisionsDict: {[key: string]: [InitType, string]} = {
    "it": [InitType.IT, "IT"], 
    "studentlife": [InitType.SL, "Student Life"], 
    "dni": [InitType.DI, "Diversity and Inclusion"], 
    "acadaffairs": [InitType.ACADAFFAIRS, "Academic Affairs"],
    "comms": [InitType.COMMS, "Communications"],
    "finance": [InitType.FINANCE, "Finance"],
  }
  const [divisionEnum, divisionName] = divisionsDict[params.division];
    if (!divisionEnum){
      return <></>
    }

    const inits = await getData(divisionEnum)
    return (
      <main className="py-8 min-h-screen">
        <div className="mb-32 text-center w-full mb-0">
          <h2 className="text-6xl">{divisionName} Initiatives:</h2>
          <div>
            {inits.map(e => (<Init key={e.id} info={e} />))}
          </div>
          <Link href={`/${params.division}/new`} className='border rounded-lg p-2'>Create an Initiative</Link>
        </div>
      </main>
    )
  }

