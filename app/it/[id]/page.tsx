import prisma from "@/lib/prisma"
import EditDelete from "@/app/components/editdelete"

export default async function Page({params}:{params: {id: number}}){
    const init = await prisma.init.findUnique({where: {id: Number(params.id)}, include: {leaders: true}})
    
    if(!init) return (
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
        
        <EditDelete params={init} leaders={leaders} />
        </div>
        
        </>
    )
}