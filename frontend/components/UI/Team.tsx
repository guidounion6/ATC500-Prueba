import React from 'react';
import PlayerTeamCard from './PlayerTeamCard';

interface Player {
    player_id: number;
    player_name: string;
    team_name: string;
    player_image: string;
}

interface TeamProps {
    teamName: string;
    teamPlayers: Player[];
    onAddPlayer: (player: Player) => void;
}

const Team = ({ teamName, teamPlayers, onAddPlayer }: TeamProps) => {
    return (
        <div className="p-4 border border-black rounded-md mt-4 flex flex-col flex-center">
            <h3 className="text-xl font-semibold">{teamName}</h3>
            <div className="h-64 border-2 border-dashed border-black rounded-md flex justify-center items-center">
                {teamPlayers.length > 0 ? (
                    <ul>
                        {teamPlayers.map((player, index) => (
                            <li key={index} className="flex items-center mb-2">
                                <PlayerTeamCard 
                                name={player.player_name}
                                team={player.team_name}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='text-black text-3xl font-bold mx-1'>Elige los Jugadores</p>
                )}
            </div>
        </div>
    );
};

export default Team;
