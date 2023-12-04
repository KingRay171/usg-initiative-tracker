import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function DELETE(request: Request, context: any){
    await prisma.di_init.delete({where: {id: Number(context.params.id)}})
    return new Response("Success", {status: 200})
}

export async function POST(request: Request, context: any){
    console.log('here')
    const id = context.params.id
    let body = Array.from((await request.formData()).entries())
  const name = body[0][1].valueOf() as string
  const desc = body[1][1].valueOf() as string
  const status = body[body.length - 1][1].valueOf() as string
  body.splice(0, 2)
  body.splice(body.length - 1, 1)

  let leaders = await prisma.leader.findMany({
    where: {
      OR: body.map((e) => {
        return {name: {equals: e[1] as string}}
      })
    }
  })

  await prisma.di_init.update({
    where: {
        id: Number(id)
    },
    data: {
      name: name, 
      description: desc,
      leader: {
        set: [],
        connect: leaders.map((e) => {
          return {id: e.id}
        })
        
      },
      lastUpdated: new Date(),
      status: status as Status
    }
  })
    return new Response("Success", {status: 200})
}