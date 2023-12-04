import prisma from "@/lib/prisma"

export async function POST(request: Request){
    const body = (await request.formData()).entries()
    const name = body.next().value[1]
    const contact = body.next().value[1]
    const alreadyExists = await prisma.leader.findFirst({where: {name: name}})
    if(alreadyExists){
        return new Response("Leader already exists", {status: 403})
    } else {
        const newLeader = await prisma.leader.create({data: {name: name, contact: contact}})
        return new Response("Leader created", {status: 200})
    }
}
