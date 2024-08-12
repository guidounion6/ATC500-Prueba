"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ATCLogo from '../public/image/ATC-Logo.svg';
import { useRouter } from 'next/navigation';

const NavBar = () => {

    const router = useRouter()
    const [ linkHref, setLinkHref ] = useState("/")

    useEffect(() => {
      const token = localStorage.getItem("token")
      if (token) setLinkHref('/dashboard')
        else router.push("/")
    }, [])
    
    return (
        <header className="bg-white text-black w-full">
            <nav className="container mx-auto flex flex-between p-5">
                <Link href={linkHref}>
                <Image
                    src={ATCLogo}
                    alt="el logo de la pagina dice ATC"
                    width={100}
                    height={100}
                />
                </Link>
                <div className='flex flex-row w-full justify-end'>
                    <Link href="/sign-up">
                        <button className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded mx-2">
                            Sign Up
                        </button>
                    </Link>
                    <Link href="/sign-in">
                        <button className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded mx-2">
                            Sign In
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default NavBar