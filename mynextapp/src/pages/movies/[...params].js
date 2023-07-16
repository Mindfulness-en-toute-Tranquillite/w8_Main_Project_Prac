import Seo from "@components/Seo";
import { useRouter } from "next/router";

export default function Detail({params}) {
    const router = useRouter();
    const [title, id] = params || [];
    return (
        <div>
            <Seo title={title}/>
            <h4>{title}</h4>
            {/* 크롬의 시크릿모드로 상세페이지로 곧바로 들어오면 Loading뜸. 
            router.query.title이 존재하지 않기 때문에 */}
        </div>
    );
}

export function getServerSideProps({params:{params}}) {
    return {
        props: {
            params,
        },
    }
}