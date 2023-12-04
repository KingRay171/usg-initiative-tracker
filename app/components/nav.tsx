import Image from "next/image"
import Link from "next/link"

export default function Nav() {
  return (
    <div className="flex justify-between px-20 w-[100%] bg-[#0A304E] items-center" >
      <div>
        <Link href="/"><Image src={"/usg.jpg"} alt="CQC Logo" width={100} height={40}/></Link>
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
