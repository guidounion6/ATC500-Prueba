import DashCard from '@/components/UI/DashCard'
import React from 'react'

const DashboardPage = () => {
    return (
        <section className='flex flex-col sm:flex-row flex-between w-full'>
            <div className='w-full'>
                <section className='w-full h-screen md:h-full py-4 px-12 md:py-12 md:ps-56 flex flex-col flex-center gap-4'>
                    <div className='w-full flex flex-between'>
                        <h1 className='text-3xl md:text-5xl text-primary font-bold'>
                            Bienvenido
                        </h1>
                        <button className='bg-terciary btn tbn-sx md:btn-md text-white border-none hover:bg-accent3'>
                            Cerrar Sesion
                        </button>
                        {/* <DashCard 
                        image=""
                        size={2}
                        title={"Mis equipos"}
                        path={""}
                        /> */}
                    </div>
                </section>
            </div>
        </section>
    )
}

export default DashboardPage