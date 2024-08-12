import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface PlayerCardProps {
    player_id: number;
    image?: string;
    name: string;
    team_name: string;
    onSavePlayer: (player: { player_id: number; player_name: string; team_name: string; player_image: string }) => void;
}

const PlayerCard = ({ player_id, image, name, team_name, onSavePlayer }: PlayerCardProps) => {
    const defaultImage = '/path/to/default/player-image.jpg';
    const playerImageSrc = image || defaultImage;

    const [submitting, setSubmitting] = useState(false);

    const playerSubmit = async () => {
        setSubmitting(true);
        try {
            const response = await axios.post('http://localhost:3001/api/v1/players/register', {
                player_id,
                image: playerImageSrc,
                name,
                team_name
            });

            console.log('Jugador guardado exitosamente:', response.data);

            onSavePlayer({
                player_id,
                player_name: name,
                team_name,
                player_image: playerImageSrc
            });

        } catch (error) {
            console.error('Error al guardar el jugador:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="my-2 h-auto w-[15vw] flex flex-col justify-start cursor-pointer overflow-hidden shadow-lg rounded-lg col-span-2 shadow-[#040c16] transform transition-transform duration-300 hover:scale-105">
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
                <h4 className="text-xs md:text-sm text-black">{team_name}</h4>
            </div>
            <div className='max-w-full flex flex-center'>
                <button
                    type="button"
                    className='w-auto bg-primary text-white my-2 py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100'
                    onClick={playerSubmit}
                >
                    {submitting ? "Guardando..." : "Guardar Jugador"}
                </button>
            </div>
        </div>
    );
};

export default PlayerCard;
