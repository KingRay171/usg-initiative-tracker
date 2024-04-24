
import { ArrowLeftEndOnRectangleIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function SignedOut() {
  return (
    <div className="space-y-2 *:flex *:h-[42px] *:grow *:items-center *:gap-2 *:rounded-md 
    *:bg-gray-50 *:p-3 *:text-sm *:font-medium *:bg-sky-100 *:text-blue-600 
    *:md:flex-none *:md:justify-start *:md:p-2 *:md:px-3">
      <Link href={"/login"}>
        <ArrowLeftEndOnRectangleIcon className="w-8" />
        <div className="text-lg">Log In</div>
      </Link>
      <Link href={"/signup"}>
        <PlusIcon className="w-8" />
        <div className="text-lg">Sign Up</div>
      </Link>
    </div>
  )
}