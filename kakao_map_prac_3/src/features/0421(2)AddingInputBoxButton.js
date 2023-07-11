import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { useMutation } from '@tanstack/react-query';

      //  중간 지점 state
      const [midPoint, setMidPoint] = useState(null);
      //  마커 찍어 줄 state
    const [positions, setPositions] = useState([]);

const gettingLocation = function (data) { 
    const newSearch = data[0];
    // positions 배열을 복제하여 prevPositions로 사용
    const prevPositions = [...positions];
    // 검색 결과를 center에 추가.(검색결과위치로 좌표찍기)
    setCenter({ lat: newSearch.y, lng: newSearch.x });
    // 검색 결과를 positions에 추가.(마커를 찍어줌))
    setPositions((prevPositions) => [
        ...prevPositions,
        {
        title: newSearch.place_name,
        latlng: { lat: newSearch.y, lng: newSearch.x },
        },
    ]);
    console.log('newSearch->', newSearch);
    console.log('positions->', positions);
}

// refresh token 얻기
const token = cookies.get('refresh_token');
//  검색 값 request폼으로 가공 후 서버통신
const { mutate, isLoading } = useMutation({
    mutationFn: async (location) => {
        console.log('location->', location[0].latlng);
        const data = await apis.post(
            '/find',
            {
                checkedPlace
            },
            {
                headers: {
                    refresh_token: `${token}`,
                    },
            },
            console.log("data====>",data)
        );
        return data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
        console.error(error);
        // 에러 처리
    },
    onSuccess: (data) => {
        const response = data.data.message;
        console.log('response', response);
        alert(response);
        const lat = data.data.data.lat;
        const lng = data.data.data.lng;
        const newMidPoint = {lat, lng};
        console.log("newMidPoint",newMidPoint);
        setMidPoint(newMidPoint);
    },
});