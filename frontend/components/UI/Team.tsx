import Image from 'next/image';
import React, { useState } from 'react';

interface Player {
    player_name: string;
    team_name: string;
    player_image: string;
}

const Team = () => {
    const [teamName, setTeamName] = useState('Mi Equipo');
    const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const playerData = event.dataTransfer.getData('player');
        if (playerData) {
            const player: Player = JSON.parse(playerData);
            setTeamPlayers((prevPlayers) => [...prevPlayers, player]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleSaveTeam = () => {
        console.log('Equipo guardado:', teamName, teamPlayers);
    };

    return (
        <div className="p-4 border border-black rounded-md mt-4">
            <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="block w-full p-2 border-b border-black mb-2 rounded-md"
                placeholder="Nombre del equipo"
            />
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="h-64 border-2 border-dashed border-black rounded-md flex justify-center items-center"
            >
                {teamPlayers.length > 0 ? (
                    <ul>
                        {teamPlayers.map((player, index) => (
                            <li key={index} className="flex items-center mb-2">
                                
                                <span>{player.player_name} - {player.team_name}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Arrastra los jugadores aquí</p>
                )}
            </div>
            <button
                onClick={handleSaveTeam}
                className="bg-terciary hover:bg-accent3 text-white font-bold py-2 px-4 rounded mx-2d mt-2"
                
            >
                Guardar Equipo
            </button>
        </div>
    );
};

export default Team;