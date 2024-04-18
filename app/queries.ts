import prisma from "@/lib/prisma"
import { InitType } from "@prisma/client";
import "server-only";

export const getInitsForHome = async () => {
    return await prisma.init.findMany({take: 5, orderBy: {createdAt: "desc"}, select: {id: true, name: true, type: true}})
}

export const getInitsForDiv = async (div: InitType) => {
    return await prisma.init.findMany({where: {type: div}, select: {id: true, name: true, description: true, type: true}})
  }

export const getInitFromId = async (id: string) => {
    return await prisma.init.findUnique({where: {id: id}, include: {leaders: true}})
}

export const getAllLeaders = async () => {
    return await prisma.user.findMany()
}

export const getUserFromEmail = async (email: string) => {
    return await prisma.user.findFirst({where: {email}})
}

export const getUserFromName = async (name: string) => {
    return await prisma.user.findFirst({where: {name}})
}

export const createUser = async (id: string, name: string, email: string, password: string, admin: boolean) => {
    return await prisma.user.create({data: {id, name, email, password, admin}})
}