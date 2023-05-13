    
        //
        const moveToMapMidPointButtonClickHandler = () => {
            router.push('/mapmidpoint') 
            // router.push({ path: '/mapmidpoint', query: { midPointProp: midPointProp } })
        };
    //  get 값 받는 state
    const [midPointProp, setMidPointProp] = useState([{}])
    const queryClient = new QueryClient()

    const { data } = useQuery({
        queryKey: ['GET_MIDPOINT'], 
        queryFn: async () => {
        const response = await apis.get(
            // 서버 URL
            `/kakaoApi?y=${midPoint?.lat}&x=%20${midPoint?.lng}&query=술집&radius=1500&page=1&size=15&sort=distance`,
            // 중간지점 lat,lng값
            midPoint
        )
        console.log("@@@@data=>", data)
        console.log("@@@@response=>",response)
        console.log("@@@@midPointProp=>",midPointProp)
        return response?.data?.documents;
        },
        // onError 콜백 함수, 에러 처리
        onError: (error) => {
            console.error(error);
        },
        // //  완료 되었을 때 콜백 함수
        onSuccess: (data) => {
            setMidPointProp(data); // 받아온 데이터를 state로 업데이트합니다.
            console.log("!@#data#@!=>",data)
        },
        enabled: true,
    });
    console.log("!@#midPointProp#@!",midPointProp)
    useEffect(() => {
    }, [midPoint]);


return (
    <button onClick={moveToMapMidPointButtonClickHandler}>
    중간지점탐색
</button>
<QueryClientProvider client={queryClient}>
    <MapMidPoint midPointProp={midPointProp} />
</QueryClientProvider>
)


//B컴포넌트
import { MidPointContext } from '@components/Modals/SearchKeywordModalPortal';
function MapMidPoint({ midPointProp }) {
    console.log("$$$midPointProp$$$",midPointProp)
        //  중간 위치 탐색 page 이동 위한 useRouter선언.
        const router = useRouter();
        const apiProps = this.router.query.midPointProp
        console.log("@@@@@@@@apiProps",apiProps)

            //  중간지점 좌표 props를 받아 서버와 통신(kakao Api검사값을 DB에 저장 및 검색결과 response)
    // const [kakaoApiData, setKakaoApiData] = useState([])
    // const kakaoApiHandler = () => {
    //     setKakaoApiData(midPointProp);
    // }
    
    console.log("kakaoApiData",kakaoApiData)
            //midPointProp이 undefined이기 때문에 useState 함수에서 초기값을 할당할 때 문제가 발생했습니다. useState 함수를 호출할 때 넘겨진 초기값이 undefined이므로, setMidPointState 함수를 호출하거나 midPointState 변수를 사용할 때 오류가 발생
    //midPointProp이 undefined가 될 수 있는 경우를 대비하여, midPointProp이 유효한지 확인하는 코드를 추가
    const [kakaoApiData, setKakaoApiData] = useState(midPointProp || { x: 0, y: 0 }); // props로 받은 값을 초기값으로 설정합니다.

    return(
        {/* <div>{[kakaoApi?.[0].place_name]}</div> */}
    )