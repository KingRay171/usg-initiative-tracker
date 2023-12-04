import { cookies } from 'next/headers'
import prisma from '@/lib/prisma';
import {redirect} from 'next/navigation'
import { Status } from '@prisma/client';

export async function GET(request: Request) {
  const allInits = await prisma.di_init.findMany()
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

  await prisma.di_init.create({
    data: {
      name: name, 
      description: desc,
      leader: {
        connect: leaders.map((e) => {
          return {id: e.id}
        })
      },
      status: status as Status
      
    }
  })
  return new Response("DI Initiative created", {status: 200})
}









