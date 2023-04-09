import NavBar from "@/components/NavBar";
import "../styles/globals.css";

export default function App({Component, pageProps}){
    return (
    <div>
        <NavBar />
        <Component {...pageProps} />
        <style jsx global>{`
            a {
                color: white;
            }
            `}</style>
    </div>
    );
}
//이게 기본적인 어플리케이션 컴포넌트의 기본적인 기능.
// export default function App({Component, pageProps}){
//     return <Component {...pageProps} />
// }