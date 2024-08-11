import Image from 'next/image';

import heroImage from "../../public/image/Fondo3.jpg"



export default function Home() {
  return (
    <section className='flex flex-col w-full h-full '>
      <div className='w-full h-full min-h-[720px]'>
        <section className="relative w-full h-full">
          <Image 
          src={heroImage} 
          alt="Una cancha de futbol" 
          fill
          quality={100}
          className="opacity-75 cover fill"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col flex-center text-center text-white p-10 bg-black bg-opacity-50">
            <h2 className="text-4xl font-bold mb-3">Crea equipos con los mejores</h2>
            <p className="text-xl mb-5">Compite con tus amigos por ver quien es el mejor manager</p>
            <button className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded"
            
            >Comienza ya!</button>
          </div>
        </section>

        <section className="container mx-auto my-10 p-5 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 text-white p-5">
            <h3 className="text-2xl font-bold">Crea tus equipos</h3>
            <p>Elige tus jugadores favoritos en un vibrante 5 vs 5</p>
          </div>
          <div className="bg-gray-800 text-white p-5">
            <h3 className="text-2xl font-bold">Infinitas tacticas</h3>
            <p>Se el mejor creando plantillas</p>
          </div>
          <div className="bg-gray-800 text-white p-5">
            <h3 className="text-2xl font-bold">Compite por todo el mundo</h3>
            <p>Juega contra todos y reclama el trono del Futbol</p>
          </div>
        </section>

        <section className="bg-black text-white py-10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3">Unete a la comunidad</h2>
            <p>Todos los usuarios discutiendo sus tacticas aqui</p>
          </div>
        </section>
      </div>
    </section>
  );
}
