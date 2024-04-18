import Init from '../components/init'
import Link from 'next/link';
import { InitType } from '@prisma/client';
import { getInitsForDiv } from '../queries';

export default async function Home({params}:{params: {division: string}}) {
  const divisionsDict: {[key: string]: string} = {
    "it": "IT", 
    "sl": "Student Life", 
    "di": "Diversity and Inclusion", 
    "acadaffairs": "Academic Affairs",
    "comms": "Communications",
    "finance": "Finance",
  }
  const divisionEnum = InitType[params.division.toUpperCase() as keyof typeof InitType]
  const divisionName = divisionsDict[params.division];
    if (!divisionEnum){
      return <></>
    }

    const inits = await getInitsForDiv(divisionEnum)
    return (
      <main className="py-8 min-h-screen dark:bg-[#1B1D1E]">
        <div className=" text-center w-full mb-0">
          <h2 className="text-6xl mb-8">{divisionName} Initiatives:</h2>
          <div>
            {inits.map(e => (<Init key={e.id} info={e} />))}
          </div>
          <Link href={`/${params.division}/new`} className='border rounded-lg p-2'>Create an Initiative</Link>
        </div>
      </main>
    )
  }

