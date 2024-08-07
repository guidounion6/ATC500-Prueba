"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import field from "../../../public/image/Fondo1.jpg"
import PlayerCard from '@/components/UI/PlayerCard'
import Team from '@/components/UI/Team'



interface Player {
    player_id: string
    player_name: string
    team_name: string
    player_image: string
}

const MatchPage = () => {
    const [search, setSearch] = useState("")
    const [players, setPlayers] = useState<any[]>([]) // Inicializa como arreglo vacío
    const [loading, setLoading] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null)

    const fetchPlayers = async () => {
        if (search.trim() === "") {
            setPlayers([])
            return
        }

        setLoading(true)
        try {
            const response = await axios.get(`https://apiv3.apifootball.com/?action=get_players&player_name=${search}&APIkey=63ce66cf2b1e3bcf8d1e0345d584100875605c2f7ef8b77f4c2c2018b4de6786`)


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
    return (
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
                            <select onChange={handlePlayerSelect} className='bg-transparent text-black mt-1 block border-gray-700 rounded-md focus:ring-primary focus:border-primary sm:text-sm border-2 py-2 px-3'>
                                <option value="">Selecciona un jugador</option>
                                {players.map((player, index) => (
                                    <option key={`${player.player_id}-${index}`} value={player.player_id}>
                                        {player.player_name}
                                    </option>
                                ))}
                            </select>
                        )}
                        {selectedPlayer && (
                            <PlayerCard
                                image={selectedPlayer.player_image}
                                name={selectedPlayer.player_name}
                                team={selectedPlayer.team_name}
                            />
                        )}

                    </div>
                    <div className="relative w-full h-full mt-4 md:mt-0">
                        <div className='absolute top-0 left-0 w-full h-full flex justify-around items-center z-10 p-4'>
                            <Team />
                            <Team />
                        </div>
                        <Image
                            src={field}
                            alt="la cancha donde vamos a acomodar a los jugadores"
                            className='w-full h-48 md:h-[100vh] object-cover rounded-lg'
                        />
                    </div>
                </section>
            </div>
        </section>
    )
}

export default MatchPage
