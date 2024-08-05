"use client"
import React from 'react'
import { useRouter } from "next/navigation"
import Image, { StaticImageData } from 'next/image'

interface HomeCardProps {
    image: StaticImageData,
    size: number,
    title: string,
    path?: string,
    onClick?: () => void
}

const DashCard = ({ image, size, title, path, onClick }: HomeCardProps) => {
    const router = useRouter()
    const navigateTo = (path: string) => {
        path ? router.push(path) : null
    }
    return (
        <div
            className={`relative cursor-pointer overflow-hidden shadow-lg rounded-lg col-span-${size} shadow-[#040c16]`}
            onClick={path ? () => navigateTo(path) : onClick}
        >
            <Image
                src={image}
                alt="card-img"
                className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-center'>
                <h3 className='text-white text-lg text-center md:text-2xl font-bold'>
                    {title}
                </h3>
            </div>
        </div>
    )
}

export default DashCard