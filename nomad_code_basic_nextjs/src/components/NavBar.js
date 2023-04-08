import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar(){
    const router = useRouter();
    // console.log(router)
    return <nav>
        <Link 
        style={{color: router.pathname === "/" ? "red" : "blue"}}
        href="/">Home
        </Link>

        <Link 
        style={{color: router.pathname === "/about" ? "red" : "blue"}}
        href="/about">About Us</Link>
    </nav>
}