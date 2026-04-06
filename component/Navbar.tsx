'use client'

import {login, logout}  from "@/lib/auth-actions";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";



export default function Navbar({session}: {session: Session | null}) {
  return (
    <nav className="py-4 border-b shadow-md border-gray-200 bg-white">
    <div className="container px-6 flex mx-auto items-center justify-between lg:px-8">
        <Link href={"/"} className="flex items-center">
        <Image src={"/logo.png"} alt="logo" width={50} height={50}/>
        <span className="font-bold text-2xl text-gray-800">Travel planner</span>
        </Link>
        {session ? (<><div className="flex items-center space-x-8">
            <Link href={"/trips"} className="text-slate-900 hover:text-sky-500">My trips</Link>
            <Link href={"/globe"} className="text-slate-900 hover:text-sky-500">Globe</Link>
        </div>
        <div className="flex items-center space-x-4">
            
            <button className="flex items-center justify-center bg-gray-800 py-3 px-6 rounded-md text-white hover:bg-gray-900 cursor-pointer font-bold" onClick={logout}>Sign out</button>
        </div> </> ) : (  <div className="flex items-center space-x-4">
            
            <button className="flex items-center justify-center bg-gray-800 py-3 px-6 rounded-md text-white hover:bg-gray-900 cursor-pointer font-bold" onClick={login}>Sign in</button>
        </div>)}
        </div>
    </nav>
  )
}
