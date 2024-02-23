import prisma from '@/lib/prisma';
import { InitType, Status } from '@prisma/client';

function initTypeFromCx(context: any): InitType | undefined{
    const divisions = ["it", "studentlife", "dni", "acadaffairs", "comms"]
    if(divisions.includes(context.params.division)){
        let division_enum: InitType;
        switch(context.params.division){
          case "it": return InitType.IT 
          case "studentlife": return InitType.SL
          case "dni": return InitType.DI
          case "acadaffairs": return InitType.ACADAFFAIRS
          default: return InitType.COMMS
        }
    }
}

export async function GET(request: Request, context: any) {
  const allInits = await prisma.init.findMany({where: {type: initTypeFromCx(context)}})
  return Response.json(allInits);
}

export async function POST(request: Request, context: any) {
  let body = Array.from((await request.formData()).entries())

  const name = body[0][1].valueOf() as string
  const desc = body[1][1].valueOf() as string
  const status = body[body.length - 1][1].valueOf() as string

  body.splice(0, 2)
  body.splice(body.length - 1, 1)

  let leaders = await prisma.user.findMany({
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
      type: initTypeFromCx(context) as InitType,
      leaders: {
        connect: leaders.map((e) => {
          return {id: e.id}
        })
      },
      status: status as Status
      
    }
  })
  return new Response("Initiative created", {status: 200})
}