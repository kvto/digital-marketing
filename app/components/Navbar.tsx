import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";

export function Navbar(){
    return(
        <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
            <div className="md:col-span-3">
                <Link href="/">
                    <h1 className="text-2xl font-bold">Junior<span className="text-primary">UI</span></h1>
                </Link>
            </div>
            <NavbarLinks />

            <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
                <Button>Ingresar</Button>
                <Button variant="secondary">Registrar</Button>

                <div className="md:hidden">
                <MobileMenu />
                </div>
            </div>
        </nav>
    )
}