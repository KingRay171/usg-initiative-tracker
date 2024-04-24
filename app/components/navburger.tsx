"use client";
import { usePathname } from 'next/navigation'

export default function NavBurger({routes}: {routes: {route: string, name: string}[]}){
    const pathname = usePathname()
    const isActive = (path: string) => pathname.startsWith(path);

    return (
        <label className="relative z-40 cursor-pointer px-3 py-6 block md:hidden" htmlFor="mobile-menu">
        <input className="peer hidden" type="checkbox" id="mobile-menu" />
        <div className="
        relative z-50 block h-[1px] w-7 bg-white bg-transparent content-[''] 
        before:absolute before:top-[-0.35rem] before:z-50 before:block 
        before:h-full before:w-full before:bg-white before:transition-all 
        before:duration-200 before:ease-out before:content-[''] 
        after:absolute after:right-0 after:bottom-[-0.35rem] after:block 
        after:h-full after:w-full after:bg-white after:transition-all 
        after:duration-200 after:ease-out after:content-[''] 
        peer-checked:bg-transparent before:peer-checked:top-0 
        before:peer-checked:w-full before:peer-checked:rotate-45 
        before:peer-checked:transform after:peer-checked:bottom-0 
        after:peer-checked:w-full after:peer-checked:-rotate-45 
        after:peer-checked:transform"></div>
        <div className="
        fixed inset-0 z-40 hidden h-full w-full bg-black/50 
        backdrop-blur-sm peer-checked:block">&nbsp;</div>
        <div
        className="fixed top-0 right-0 z-40 h-full w-full translate-x-full 
        overflow-y-auto overscroll-y-none transition duration-500 
        peer-checked:translate-x-0">
          <div className="float-right min-h-full w-[85%] bg-white dark:bg-slate-800 px-6 pt-24 shadow-2xl">
            <menu className="
            flex flex-col text-lg text-black dark:text-white space-y-4 
            [&_.active]:underline [&>*:hover]:text-white"
            >
              {routes.map(({route, name}, idx) => (
                <a key={idx} href={route} className={`${isActive(route) ? "active " : ""}`}>
                    {name}
                </a>
              ))}
            </menu>
          </div>
        </div>
      </label>
    )
}