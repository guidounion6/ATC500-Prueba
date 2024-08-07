"use client"
import DashCard from '@/components/UI/DashCard'
import React from 'react'
import juega from "../../../public/image/Juega.jpg"
import Equipos from "../../../public/image/Equipos.jpg"
import Rank from "../../../public/image/WorldRank.jpg"
import Torneo from "../../../public/image/Torneo.jpg"
import Rival from "../../../public/image/Busca Rival.jpg"
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

const DashboardPage = () => {
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem('token')
        router.push("/")
    }
    return (
        <ProtectedRoute>
        <section className="flex flex-col sm:flex-row flex-between w-full bg-gray-200">
            <div className='w-full'>
                <section className="w-full h-screen md:h-full mt-4 md:mt-0 px-12 md:py-6 flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex flex-between">
                        <h1 className="text-2xl md:text-5xl text-primary font-bold">
                            Bienvenido
                        </h1>
                        <button
                            onClick={logout}
                            className='bg-terciary btn tbn-sx md:btn-md text-white border-none hover:bg-accent3'>
                            Cerrar Sesion
                        </button>
                    </div>
                    <section className='grid grid-cols-3 grid-rows-1 gap-4 my-4'>
                        <DashCard
                            image={juega}
                            size={1}
                            title={"Arma un partido"}
                            path={"/partido"}

                        />
                        <DashCard
                            image={Equipos}
                            size={1}
                            title={"Tus Equipos"}
                            path={"/equipos"}

                        />
                    </section>
                    <section className="w-full md:h-full flex flex-col md:justify-center items-center">
                        <div className='w-full'>
                            <h2 className='text-3xl text-primary font-semibold'>
                                Compite contra otros usuarios
                            </h2>
                        </div>
                        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-xl shadow-[#040c16] group rounded-md flex flex-center bg-cover relative'>
                            <div className='grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 my-4 mx-2'>
                                <DashCard image={Rank} size={1} title={"World Ranks"} />
                                <DashCard image={Torneo} size={1} title={"Torneos"} />
                                <DashCard image={Rival} size={1} title={"Busca Rival"} />
                            </div>
                            <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col flex-center '>
                                <span className='text-2xl font-bold text-white tracking-wider'></span>
                                <button className='text-center rounded-lg px-4 py-4 m-2 bg-white text-gray-700 font-bold text-lg'>
                                    Proximamente...
                                </button>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </section>
        </ProtectedRoute>
    )
}

export default DashboardPage