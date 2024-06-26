"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import signup from './signup';


export default function LoginForm() {
  const { pending } = useFormStatus();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const router = useRouter()
 
  return (
    <div className='dark:bg-[#1B1D1E]'>
    <form className="space-y-3 dark:bg-[#1B1D1E] [&_input]:dark:bg-gray-800 [&_input]:dark:text-white" action={signup}>
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          Please sign up to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                defaultValue={name}
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
              }}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                defaultValue={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
              }}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                defaultValue={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
              }}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="adminpass"
            >
              Admin Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="adminpass"
                type="password"
                name="adminpass"
                placeholder="Enter admin password (optional)"
                defaultValue={adminPassword}
                onChange={(e) => {
                  e.preventDefault();
                  setAdminPassword(e.target.value);
              }}
                
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className='flex flex-row '>
          <LoginButton  />
          
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          
        </div>
      </div>
    </form>
    <button className="mt-4 w-full border rounded-md border-gray-200 w-100" aria-disabled={pending} onClick={() => {router.push("/login")}}>
      <div className='text-black dark:text-white'>Log in</div> <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 bg-black" />
    </button>
    </div>
  );
}
 
function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button className="mt-4 w-full border rounded-md border-gray-200 w-100" aria-disabled={pending}>
      <div className='text-black dark:text-white'>Sign up</div> <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 bg-black" />
    </button>
  );
}
