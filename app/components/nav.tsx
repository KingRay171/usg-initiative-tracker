import Image from "next/image"
import Link from "next/link"
import { validateRequest } from "@/auth";
import NavRight from "./navright";
import NavBurger from "./navburger";
import SignedIn from "./signedin";
import SignedOut from "./signedout";
import { Suspense } from "react";

export default async function Nav() {
  const routes = [
    {route: "/it", name: "IT"},
    {route: "/sl", name: "Student Life"},
    {route: "/acadaffairs", name: "Academic Affairs"},
    {route: "/di", name: "Diversity and Inclusion"},
    {route: "/finance", name: "Finance"},
    {route: "/comms", name: "Communications"}
  ]
  
  const handleAuth = async () => {
    const session = await validateRequest()
    if(session.session){
      return <SignedIn validatedReq={session} />
    } else {
      return <SignedOut />
    }
  }
  
  return (
    <div className="flex justify-between px-[2vw] w-[100%] bg-[#0A304E] items-center text-gray-400" >
      <div>
        <div className="flex justify-center items-center m-4">
          <Link href="/">
            <Image src={"/usg.jpg"} alt="USG Logo" width={100} height={40}/>
          </Link>
          <div className=" p-2">
            <Suspense>{handleAuth()} </Suspense>
            </div>
          </div>
      </div>
      <NavRight routes={routes}/>
      <NavBurger routes={routes}/>
    </div>
  )
}
