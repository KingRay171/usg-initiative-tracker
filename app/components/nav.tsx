import { auth } from "@/auth"
import Image from "next/image"
import Link from "next/link"
import { signOut } from '@/auth'
import { PowerIcon } from '@heroicons/react/24/outline';

export default async function Nav() {
  const session = await auth()
  return (
    <div className="flex justify-between px-20 w-[100%] bg-[#0A304E] items-center" >
      <div>
        <Link href="/"><Image src={"/usg.jpg"} alt="USG Logo" width={100} height={40}/></Link>
        
        {session && (
            <form
            action={async () => {
              'use server';
              await signOut({redirect: true, redirectTo: "/"});
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
          )}
          {!session && (
          <Link href={"/login"} className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Log In</div>
          
          </Link>
          )}
      </div>
      <div className="py-2 space-x-5 text-lg">
        <Link href="/it">IT</Link>
        <Link href="/studentlife">Student Life</Link>
        <Link href="/acadaffairs">Academic Affairs</Link>
        <Link href="/dni">Diversity and Inclusion</Link>
        <Link href="/comms">Communications</Link>
      </div>
    </div>
  )
}
