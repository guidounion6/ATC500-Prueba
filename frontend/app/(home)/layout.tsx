import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "My Next.js App",
    description: "  "
}

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className="relative bg-gray-200">
            <NavBar />
            <div className="flex">
                <section className="flex min-h-screen flex-1 flex-col max-md:pb-14">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>
            <Footer />
        </main>


    )
}

export default HomeLayout