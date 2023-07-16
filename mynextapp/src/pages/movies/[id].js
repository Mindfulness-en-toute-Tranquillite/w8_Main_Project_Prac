import { useRouter } from "next/router";

export default function Detail() {
    const router = useRouter();
    console.log("router",router);
    return (
        <div>
            <h4>{router.query.title || "Loading..."}</h4>
            {/* 크롬의 시크릿모드로 상세페이지로 곧바로 들어오면 Loading뜸. 
            router.query.title이 존재하지 않기 때문에 */}
        </div>
    );
}