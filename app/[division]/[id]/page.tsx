import prisma from "@/lib/prisma"
import EditDelete from "@/app/components/editdelete"
import { InitType } from "@prisma/client";
import { validateRequest } from "@/auth"; 

export default async function Page({params}:{params: {division: string, id: string}}){
    const divisionsDict: {[key: string]: InitType} = {
      "it": InitType.IT, 
      "studentlife": InitType.SL, 
      "dni": InitType.DI, 
      "acadaffairs": InitType.ACADAFFAIRS,
      "comms": InitType.COMMS,
      "finance": InitType.FINANCE
    }
    const session = await validateRequest()
    const division_enum = divisionsDict[params.division];
    if (!division_enum){
      return <></>
    }
    
    const init = await prisma.init.findUnique({where: {id: params.id}, include: {leaders: true}})
    if(!init || init.type !== division_enum) return (
      <>
      <div>This initiative does not exist</div>
      <p>The URL references an initiative that could not be found. Either it was recently deleted or a mistake was made.</p>
      </>
    )
    const leaders = await prisma.user.findMany()
    return (
        <>
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
            
        {session.session && <EditDelete params={init} leaders={leaders} />}
        </div>
            
        </>
    )
    
}