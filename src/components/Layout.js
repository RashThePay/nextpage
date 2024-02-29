import Navbar from "./Navbar"
import { Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                <section className="m-4">
                <Flex justifyContent="center">
                    {children}
                    </Flex>
                </section>
            </main>
        </>
    )
}