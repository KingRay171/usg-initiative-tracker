import prisma from '@/lib/prisma';
import { InitType, Status } from '@prisma/client';

export async function GET(request: Request) {
  const allInits = await prisma.init.findMany({where: {type: InitType.COMMS}})
  return Response.json(allInits);
}

export async function POST(request: Request) {
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

  await prisma.init.create({
    data: {
      name: name, 
      description: desc,
      type: InitType.COMMS,
      leaders: {
        connect: leaders.map((e) => {
          return {id: e.id}
        })
      },
      status: status as Status
      
    }
  })
  return new Response("Comms Initiative created", {status: 200})
}









