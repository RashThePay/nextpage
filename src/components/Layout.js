import Navbar from "./Navbar"

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                <section className="m-4">
                    {children}
                </section>
            </main>
        </>
    )
}