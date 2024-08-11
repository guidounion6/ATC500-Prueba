import type { Metadata } from "next"
import React from "react"

const metadata: Metadata = {
    title: "My Next.js App",
    description: "My Next.js App",
}

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
            <main className="bg-gray-200">
                <div className="flex">
                    <section className="flex min-h-screen flex-1 flex-col max-md:pb-14 ">
                        {children}
                    </section>
                </div>
            </main>
    )
}

export default DashboardLayout