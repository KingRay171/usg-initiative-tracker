import prisma from "@/lib/prisma"

export async function POST(request: Request){
    const body = (await request.formData()).entries()
    const name = body.next().value[1]
    const email = body.next().value[1]
    const password = body.next().value[1]
    const adminPassword = body.next().value[1]
    const admin = adminPassword == "usg"
    const alreadyExists = await prisma.user.findFirst({where: {name: name}})
    if(alreadyExists){
        return new Response("Leader already exists", {status: 403})
    } else {
        const newUser = await prisma.user.create({data: {name, email, password, admin}})
        return new Response("Leader created", {status: 200})
    }
}