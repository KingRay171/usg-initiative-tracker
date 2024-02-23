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
  const divisions = ["it", "studentlife", "dni", "acadaffairs", "comms"]
  if(divisions.includes(params.division)){
    let division_enum: InitType;
    let division_name: string;
    switch(params.division){
      case "it": { 
          division_enum = InitType.IT 
          division_name = "IT"
          break;
      }
      case "studentlife": {
        division_enum = InitType.SL
        division_name = "Student Life"
          break;
      }
      case "dni": {
        division_enum = InitType.DI
        division_name = "Diversity and Inclusion"
          break;
      }
      case "acadaffairs": {
        division_enum = InitType.ACADAFFAIRS
        division_name = "Academic Affairs"
          break;
      }
      default: {
        division_enum = InitType.COMMS
        division_name = "Communications"
        break;
      }

    }
    const inits = await getData(division_enum)
    return (
      <main className="py-8 min-h-screen">
        <div className="mb-32 text-center w-full mb-0">
          <h2 className="text-6xl">{division_name} Initiatives:</h2>
          <div>
            {inits.map(e => (<Init key={e.id} info={e} />))}
          </div>
          <Link href={`/${params.division}/new`} className='border rounded-lg p-2'>Create an Initiative</Link>
        </div>
      </main>
    )
  }
  
}

