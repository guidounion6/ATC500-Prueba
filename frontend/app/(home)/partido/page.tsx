"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import field from "../../../public/image/Fondo1.jpg"
import PlayerCard from '@/components/UI/PlayerCard'
import Team from '@/components/UI/Team'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Swal from "sweetalert2"

const MatchPage = () => {
    const [search, setSearch] = useState("");
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
    const [team1, setTeam1] = useState<any[]>([]);
    const [team2, setTeam2] = useState<any[]>([]);

    const fetchPlayers = async () => {
        if (search.trim() === "") {
            setPlayers([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`https://apiv3.apifootball.com/?action=get_players&player_name=${search}&APIkey=63ce66cf2b1e3bcf8d1e0345d584100875605c2f7ef8b77f4c2c2018b4de6786`);

            if (Array.isArray(response.data)) {
                const filteredPlayers = response.data.map(({ player_id, player_name, team_name, player_image }: any) => ({
                    player_id,
                    player_name,
                    team_name,
                    player_image
                }))
                setPlayers(filteredPlayers)
            } else {
                setPlayers([])
                console.error("Unexpected response data:", response.data)
            }
        } catch (error) {
            console.error("Error fetching players:", error)
            setPlayers([])
        } finally {
            setLoading(false)
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchPlayers()
        }
    }

    const handlePlayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const playerId = e.target.value
        const player = players.find((p) => p.player_id === playerId)
        setSelectedPlayer(player)
    }

    const handleSavePlayer = (player: any) => {
        if (team1.some(p => p.player_id === player.player_id) || team2.some(p => p.player_id === player.player_id)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El jugador ya está en uno de los equipos.',
            });
            return;
        }
    
        if (team1.length < 5) {
            setTeam1([...team1, player]);
        } else if (team2.length < 5) {
            setTeam2([...team2, player]);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Ambos equipos están completos.',
            });
        }
    
        setSelectedPlayer(null); 
    }
    const handleRemovePlayer = (player_id: number) => {
        setTeam1(team1.filter(player => player.player_id !== player_id));
        setTeam2(team2.filter(player => player.player_id !== player_id));
    };

    return (
        <ProtectedRoute>
            <section className='flex flex-col sm:flex-row flex-between w-full p-4'>
                {/* Div Contenedor */}
                <div className='flex flex-col w-full'>
                    <div className='flex justify-start items-center pb-2'>
                        <h1 className='text-2xl md:text-5xl text-primary font-bold'>
                            Arma tu partido
                        </h1>
                    </div>
                    <section className="flex flex-col md:flex-row">
                        <div className="w-full md:w-[30vw] flex flex-col mx-2">
                            <h3 className='text-lg font-semibold'>Elige un jugador</h3>
                            <div className=''>
                                <input
                                    type="search"
                                    value={search}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                    className="bg-transparent text-black mt-1 block border-gray-700 rounded-md focus:ring-primary focus:border-primary sm:text-sm border-2 py-2 px-3 w-full"
                                />
                            </div>
                            {loading ? (
                                <p>Cargando...</p>
                            ) : (
                                <select onChange={handlePlayerSelect} className='bg-transparent text-black mt-1 block border-gray-700 rounded-md focus:ring-primary focus:border-primary sm:text-sm border-2 py-2 px-3 w-full'>
                                    <option value=''>Seleccionar Jugador</option>
                                    {players.map((player) => (
                                        <option key={player.player_id} value={player.player_id}>
                                            {player.player_name} - {player.team_name}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {selectedPlayer && (
                                <PlayerCard
                                    player_id={selectedPlayer.player_id}
                                    image={selectedPlayer.player_image}
                                    name={selectedPlayer.player_name}
                                    team_name={selectedPlayer.team_name}
                                    onSavePlayer={handleSavePlayer}
                                />
                            )}
                        </div>

                        <div className='relative w-full md:w-[60vw] mx-2'>
                            <Image
                                src={field}
                                width={500}
                                height={500}
                                alt='Imagen de fondo'
                                className='w-full object-contain opacity-25'
                            />
                            <div className='absolute inset-0 flex flex-col md:flex-row justify-between p-4 text-black'>
                                <Team teamName='Equipo 1' teamPlayers={team1} onRemovePlayer={handleRemovePlayer} />
                                <Team teamName='Equipo 2' teamPlayers={team2} onRemovePlayer={handleRemovePlayer} />
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </ProtectedRoute>
    )
}

export default MatchPage
