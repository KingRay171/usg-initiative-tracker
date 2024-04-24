"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Init({info}: {info: {id: string, name: string, description: string}}){
    const pathname = usePathname()
    return (
      <Link href={`${pathname}/${info.id}`}>
        <div key={info.id} className="m-8 p-2 border rounded-xl">
          <h3 className="text-3xl">{info.name}</h3>
          <h3 className="text-xl">{info.description}</h3>
        </div>
      </Link> 
    )
}