import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export const ModifiedByChatGPT = () => {
    //  지도 초기 위치 및 위도경도 state값
    const [center, setCenter] = useState({
        lat: 37.49676871972202,
        lng: 127.02474726969814,
    });
    //  지도 부드럽게 움직이기
    const [isPanto, setIsPanto] = useState(true);
    //  검색(1,2) useState
    const [searchAddress1, setSearchAddress1] = useState('');
    const [searchAddress2, setSearchAddress2] = useState('');
    //  마커 찍어 줄 state
    const [positions, setPositions] = useState([]);
    //  검색 Button Handler 1
    const searchAddressButtonHandler1 = (e) => {
        setSearchAddress1(e.target.value);
    };
    //  검색 Button Handler 2
    const searchAddressButtonHandler2 = (e) => {
        setSearchAddress2(e.target.value);
    };
    // 두 지점의 중간 좌표 구하는 함수
    const getMiddlePosition = (pos1, pos2) => {
        const lat = (pos1.lat + pos2.lat) / 2;
        const lng = (pos1.lng + pos2.lng) / 2;
        return { lat, lng };
    };

    //  키워드 검색 로직
    const handleSearchMap = (searchAddress) => {
        const ps = new kakao.maps.services.Places();
        const placesSearchCB = function (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                const newSearch = data[0];
                const prevPositions = [...positions]; // positions 배열을 복제하여 prevPositions로 사용
                // 검색 결과를 cetner에 추가.(검색결과위치로 좌표찍기)
                setCenter({ lat: newSearch.y, lng: newSearch.x });
                // 검색 결과를 positions에 추가.(마커를 찍어줌))
                setPositions((prevPositions) => [
                    ...prevPositions,          
                    { 
                    title: newSearch.place_name, 
                    latlng: { lat: newSearch.y, lng: newSearch.x } 
                    },
                ]);
                
                // 검색 결과가 2개 이상이면 두 지점의 중간 지점을 구하여 positions에 추가
                if (prevPositions.length === 1) {
                    const pos1 = prevPositions[0].latlng;
                    const pos2 = { lat: newSearch.y, lng: newSearch.x };
                    const middlePos = getMiddlePosition(pos1, pos2);
                    setPositions((prevPositions) => [
                        ...prevPositions,
                        { 
                        title: '', 
                        latlng: middlePos 
                        },
                        { 
                        title: newSearch.place_name, 
                        latlng: { lat: newSearch.y, lng: newSearch.x } 
                        },
                    ]);
                setIsPanto(false);
            } 
        }
        };
        ps.keywordSearch(`${searchAddress}`, placesSearchCB);
    };

    // useEffect(() => {
    //     if (positions.length >= 2) {
    //         const pos1 = positions[positions.length - 2].latlng;
    //         const pos2 = positions[positions.length - 1].latlng;
    //         const middlePos = getMiddlePosition(pos1, pos2);
    //         setPositions((prevPositions) => [
    //             ...prevPositions,
    //             {
    //                 title: '중간 지점',
    //                 latlng: middlePos,
    //             },
    //         ]);
    //     }
    // }, [positions]);
    
return (
    <>
        <Map
            center={center}
            isPanto={isPanto}
            style={{
                width: '100%',
                height: '650px',
            }}
            level={3}
        >
            {positions.map((position, index) => (
                <MapMarker
                    key={`${position.title}-${position.latlng}`}
                    position={position.latlng} // 마커를 표시할 위치
                    image={{
                        src: 
                            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                        size: {
                            width: 24,
                            height: 35,
                        }, // 마커이미지의 크기입니다
                    }}
                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                />
            ))}
            {positions.length > 0 && (
            <MapMarker
                position={positions[0].latlng}
                image={{
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker.png',
                    size: {
                        width: 24,
                        height: 35,
                    },
                }}
                title="중간 지점"
            />
        )}
        </Map>


    <div>
        A : &nbsp;
        <input onChange={searchAddressButtonHandler1} value={searchAddress1} />
        <button onClick={() => handleSearchMap(searchAddress1)}>검색</button>
    </div>

    <div>
        B : &nbsp;
        <input onChange={searchAddressButtonHandler2} value={searchAddress2} />
        <button onClick={() => handleSearchMap(searchAddress2)}>검색</button>
    </div>
    </>
    )
}
export default ModifiedByChatGPT