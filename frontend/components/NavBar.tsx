import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import ATCLogo from '../public/image/ATC-Logo.svg';

const NavBar = () => {
    return (
        <header className="bg-white text-black w-full">
            <nav className="container mx-auto flex flex-between p-5">
                <Image
                    src={ATCLogo}
                    alt="el logo de la pagina dice ATC"
                    width={100}
                    height={100}
                />
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