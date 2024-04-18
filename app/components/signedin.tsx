
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import { User, Session } from 'lucia';

type validatedRequest = {
        user: User;
        session: Session;
}


async function logOut() {
    'use server';
    const { session } = await validateRequest();
    if (!session) {
      return {
        error: "Unauthorized"
      };
    }
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
    //await signOut({redirect: true, redirectTo: "/"});
  }

export default async function SignedIn({validatedReq}: {validatedReq: validatedRequest}) {
    const name = validatedReq.user.name
    return (
        <div className="space-y-2">
          <p>Hello, {name}</p>
          <form action={logOut}>
            <button className="
            flex h-[48px] grow items-center justify-center gap-2 rounded-md 
            bg-gray-50 p-3 text-sm font-medium bg-sky-100 text-blue-600 
            md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <ArrowLeftStartOnRectangleIcon className="w-8" />
              <div className="text-lg">Sign Out</div>
            </button>
          </form>
        </div>
    )
}