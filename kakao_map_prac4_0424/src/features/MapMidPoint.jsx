import { apis } from '@shared/axios';
import React from 'react'

function MapMidPoint() {
        //  검색 값 request폼으로 가공 후 서버통신
        const { mutate, isLoading } = useMutation({
            mutationFn: async (location) => {
                console.log('location->', location[0]);
                const data = await apis.post
                (
                    //  서버 URL
                    '/kakaoApi',
                    //  Request값(x,y~x4,y4)
                    'http://mannazan.shop/kakaoApi?y=37.49676871972202&x=127.02474726969814&query=%EC%88%A0%EC%A7%91&radius=1500&page=1&size=15&sort=distance'
                );
                return data;
            },
            // onError 콜백 함수, 에러 처리
            onError: (error) => {
                console.error(error);
            },
            //  완료 되었을 때 콜백 함수
            onSuccess: (data) => {
                const response = data.data.message;
                alert(response);
            },
        });
    return (
    <div>
        <button
            onClick={() => {mutate();}}
        >
        검색
        </button>
    </div>
    )
}

export default MapMidPoint