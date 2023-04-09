import NavBar from "../components/NavBar";


export default function Home() {
    return (
        <div>
            {/* <NavBar /> */}
            <h1 className="active">Hello</h1>
            <style jsx global>{`
            a {
                color: white;
            }
            `}</style>
        </div>
    );
}