"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function NavRight({routes}:{routes: {route: string, name: string}[]}){
    
    const pathname = usePathname()
    const isActive = (path: string) => pathname.startsWith(path);

    return (
      <div className="
      py-2 space-x-[1vw] text-lg hidden md:block 
      [&_.active]:underline [&>*:hover]:text-white"
      >
        {routes.map(({route, name}, idx) => (
            <Link key={idx} href={route} className={`${isActive(route) ? "active " : ""}text-[1.25vw]`}>
                {name}
            </Link>
        ))}
      </div>
    )
}