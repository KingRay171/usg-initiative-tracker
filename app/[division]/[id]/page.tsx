import EditDelete from "@/app/components/editdelete"
import { InitType } from "@prisma/client";
import { validateRequest } from "@/auth"; 
import { getAllLeaders, getInitFromId } from "@/app/queries";
import { Suspense } from "react";
import { UnknownSession } from "@/new-types";

const handleInitExists = async ({params}:{params: {division: string, id: string}}, divisionEnum: InitType, session: UnknownSession) => {
    const init = await getInitFromId(params.id)
    if(!init || init.type !== divisionEnum) return (
        <>
        <div>This initiative does not exist</div>
        <p>The URL references an initiative that could not be found. Either it was recently deleted or a mistake was made.</p>
        </>
      )
      const leaders = await getAllLeaders()
      return (
          <div className="dark:bg-[#1B1D1E]">
          <div className="border border-2 rounded-2xl mx-8 my-8 flex flex-col px-16 py-4 space-y-4">
          <h1 className="text-6xl">{init.name}</h1>
          <div className="flex space-x-4">
              <h3 className="text-3xl">Description:</h3>
              <h3 className="text-3xl">{init.description}</h3>
          </div>
          <div className="flex space-x-4">
              <h3 className="text-3xl">Status:</h3>
              <h3 className="text-3xl">{init.status}</h3>
          </div>
          <div className="flex flex-col space-y-2">
              <h3 className="text-3xl">Initiative Leaders:</h3>
              {init.leaders.map(e => (
                  <h3 key={e.id} className="text-3xl">{e.name} ({e.email})</h3>
              ))}
          </div>
              
          {session.user?.admin && <EditDelete init={init} leaders={leaders} />}
          </div>
          </div>
      )
}

export default async function Page({params}:{params: {division: string, id: string}}){

    const session = await validateRequest()
    const divisionEnum = InitType[params.division.toUpperCase() as keyof typeof InitType]
    if (!divisionEnum){
      return <></>
    }

    return (
        <Suspense>{handleInitExists({params}, divisionEnum, session)}</Suspense>
    )
    
}