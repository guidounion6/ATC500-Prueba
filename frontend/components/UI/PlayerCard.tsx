import React from 'react';
import Image from 'next/image';

interface PlayerCardProps {
    image?: string; // La imagen ahora es opcional
    name: string;
    team: string;
}



const PlayerCard = ({ image, name, team }: PlayerCardProps) => {
    
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const playerData = JSON.stringify({ player_name: name, team_name: team, player_image: image });
        event.dataTransfer.setData('player', playerData);
    };

    const defaultImage = '/path/to/default/player-image.jpg';

  
    const playerImageSrc = image || defaultImage;

    return (
        <div
            className="my-2 h-[15vw] w-[15vw] flex flex-col justify-start cursor-pointer overflow-hidden shadow-lg rounded-lg col-span-2 shadow-[#040c16] transform transition-transform duration-300 hover:scale-105"
            draggable
            onDragStart={handleDragStart}
        >
            <div className="m-2">
                <Image
                    src={playerImageSrc}
                    width={60} 
                    height={60}
                    alt={`Imagen de ${name}`}
                    className="object-cover rounded-full"
                />
            </div>
            <div className="text-center">
                <h2 className="text-sm md:text-base font-bold text-secondary">Nombre del Jugador:</h2>
                <h3 className="mb-2 text-xs md:text-sm text-black">{name}</h3>
                <h3 className="text-sm md:text-base font-bold text-terciary">Nombre del Equipo:</h3>
                <h4 className="text-xs md:text-sm text-black">{team}</h4>
            </div>
        </div>
    );
};

export default PlayerCard;
