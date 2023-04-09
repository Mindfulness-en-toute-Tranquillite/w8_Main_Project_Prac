import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar(){
    const router = useRouter();
    // console.log(router)
    return <nav>
        <Link legacyBehavior
        href="/">
        <a
        className={router.pathname === "/" ? "active":""}
        >Home</a>
        </Link>

        <Link legacyBehavior
        href="/about">
        <a
        className={router.pathname === "/about" ? "active":""}
        >About Us</a>
        </Link>
        <style jsx>{`
        nav {
            background-color: tomato;
        }
        a {
            text-decoration: none;
        }
        .active {
            color: yellow;
        }

        `}</style>
    </nav>
} 

        /* .active {
            color: ${props.color};
        } */