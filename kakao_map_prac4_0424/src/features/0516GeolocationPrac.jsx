import React, { useEffect } from 'react'

function GeolocationPrac() {
    useEffect(() => {MapCreate},[])
    //  키워드 검색 로직
    const MapCreate =() => {
        const { kakao } = window;
        //지도를 담을 영역의 DOM 레퍼런스
        const container = document.getElementById('map'); 
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(midPointProp?.lat, midPointProp?.lng), //지도의 중심좌표(중간지점props받은 값으로 해당지점 찍어줌)
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        //지도 생성 및 객체 리턴
        const map = new kakao.maps.Map(container, options);     
        //  Geolocation 
        useEffect(() => {getGeolocationButtonHandler({ target: { value: '' } });},[])
        //  Geolocation Button Handler
        const getGeolocationButtonHandler = () => {
            if (navigator.geolocation) {
              // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                    ...prev,
                    center: {
                      lat: position.coords.latitude, // 위도
                      lng: position.coords.longitude, // 경도
                    },
                    isLoading: false,
                    }))
                },
                (err) => {
                    setState((prev) => ({
                    ...prev,
                    errMsg: err.message,
                    isLoading: false,
                    }))
                }
            )
            } else {
              // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                setState((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할수 없어요..",
                isLoading: false,
                }));
            }
        };
    }
    return (
        <div>
            <div className='map'
            center={{lat : 37.534485, lng :126.994369}}
            style={{width: '500px', height: '500px'}}
            ></div>
            <div
            style={{position: "relative"}}>
            <button 
            style={{width: "20px", height: "20px", position: "absolute", top: "10px", right: "10px"}}
            // onClick={getGeolocationButtonHandler}
            >
            <img
            src= "myLocation.png" // Geolocation이미지의 주소.
            alt="Geolocation button"
            style={{width: "100%", height: "100%"}}
            />
            </button>
            </div>
        </div>
    )
}

export default GeolocationPrac