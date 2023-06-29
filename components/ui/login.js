"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const { data: session } = useSession()

  return (
    <div className="ml-auto flex gap-2">
      {session?.user ?(
        <>
        <Link href="/pages/admin/gallery"> Gallery </Link>
        <Link href="/pages/admin/categories"> Categories </Link>
        <Link href="/pages/admin/status"> Status </Link>
        <Link href="/pages/admin/users"> Users </Link>
          <p className="text-sky-600">Welcome {session.user.first_name}</p>
          <button className="text-red-500" onClick={() => signOut()}> Sign Out </button>
        </>
      ) : (
<         button className="text-green-500" onClick={() => signIn()}> Sign In </button>
      )}
    </div>
  )
}
