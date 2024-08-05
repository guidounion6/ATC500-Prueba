import React from 'react'
import Image from 'next/image'
import player from "../../public/image/Player.png"

interface PlayerCardProps {
    image: string, 
    name: string,
    team: string
}

const PlayerCard = ({image, name, team}: PlayerCardProps) => {
    
    const playerImageSrc = image || player
    return (
        <div className='my-2 h-[15vw] w-[15vw] flex flex-col justify-start cursor-pointer overflow-hidden shadow-lg rounded-lg col-span-2 shadow-[#040c16] transform transition-transform duration-300 hover:scale-105'>
            <div className='m-2'>
                <Image
                    src={playerImageSrc}
                    width={80}
                    height={80}
                    alt={`Imagen de ${name}`}
                    className='object-cover rounded-full'
                />
            </div>
            <div className='flex flex-col mx-2 text-black'>
                <h2 className='text-secondary'>Player Name:</h2>
                <h3>{name}</h3>
                <h3 className='text-terciary'>Team Name:</h3>
                <h4>{team}</h4>
            </div>
        </div>
    )
}

export default PlayerCard