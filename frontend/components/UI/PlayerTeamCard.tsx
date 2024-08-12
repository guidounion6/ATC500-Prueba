import React from 'react';

interface PlayerTeamCardProps {
    player_id: number;
    name: string; 
    team: string;
    onRemovePlayer: (player_id: number) => void;
}

const PlayerTeamCard = ({ player_id, name, team, onRemovePlayer }: PlayerTeamCardProps) => {
    return (
        <section 
            className="h-[30px] w-[15vw] flex flex-col flex-center cursor-pointer overflow-hidden shadow-lg rounded-lg col-span-2 shadow-[#040c16] transform transition-transform duration-300 hover:scale-105 bg-gray-200"
            onClick={() => onRemovePlayer(player_id)}
        >
            <div className='text-center'>
                <span className="text-xs md:text-sm text-black">{name} - {team}</span>
            </div>
        </section>
    );
}

export default PlayerTeamCard;
