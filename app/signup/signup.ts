"use server";

import { lucia } from '@/auth'; 
import { cookies } from 'next/headers';
import prisma from "@/lib/prisma"
import { generateId } from 'lucia';
import { redirect } from "next/navigation";

interface ActionResult {
	error: string;
}

export default async function signup(formData: FormData): Promise<ActionResult> {
	const body = formData.entries()
    const name = body.next().value[1]
    const email = body.next().value[1]
    const password = body.next().value[1]
    const adminPassword = body.next().value[1]
    const admin = adminPassword == "usg"
    const alreadyExists = await prisma.user.findFirst({where: {name: name}})
    if(alreadyExists){
        return {error: "Leader already exists"}
    } else {
        const id = generateId(15)
        const newUser = await prisma.user.create({data: {id, name, email, password, admin}})
        const session = await lucia.createSession(id, {});
	      const sessionCookie = lucia.createSessionCookie(session.id);
	      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	      return redirect("/");
    }
}