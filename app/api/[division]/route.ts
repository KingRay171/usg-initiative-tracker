import { getAllDivisionInits } from '@/app/queries';
import prisma from '@/lib/prisma';
import { InitType, Status } from '@prisma/client';

export async function GET(request: Request, context: any) {
  return Response.json(await getAllDivisionInits(context.toUpperCase()));
}

export async function POST(request: Request, context: any) {
  let body = Array.from((await request.formData()).entries())
  const name = body[0][1].valueOf() as string
  const desc = body[1][1].valueOf() as string
  const status = body[body.length - 1][1].valueOf() as string

  body.splice(0, 2)
  body.splice(body.length - 1, 1)
  let leaders = body.map((e) => {return {id: (e[1] as string).split(":")[1].split(")")[0]}})

  await prisma.init.create({
    data: {
      name: name, 
      description: desc,
      type: InitType[context.params.division.toUpperCase() as keyof typeof InitType],
      leaders: {
        connect: leaders
      },
      status: status as Status
      
    }
  })
  return new Response("Initiative created", {status: 200})
}