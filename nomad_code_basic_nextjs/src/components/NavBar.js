import Link from "next/link";

export default function NavBar(){
    return <nav>
        <Link 
        style={{color: "red"}}
        href="/">Home</Link>
        <Link href="/about">About Us</Link>
    </nav>
}