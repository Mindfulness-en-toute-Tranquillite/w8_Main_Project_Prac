/*global kakao*/
import { useCallback, useEffect, useRef, useState } from "react";
import { Map, MapInfoWindow, MapMarker, MapTypeControl, MapTypeId, ZoomControl, AddMapControlStyle, Roadview } from "react-kakao-maps-sdk"

//kakao 못 불러오는거 에러 해결 코드 시도(실패)
// window.onload = function () {
//     kakao.maps.load(function () {
//         // 지도를 생성합니다
//     })
// }


function Home() {
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.553836, lng: 126.969652 },
        // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
        isPanto: true,
        });
        const [searchAddress, SetSearchAddress] = useState();
        // 지도 검색 버튼
        const searchAddressButtonHandler = (e) => {
            SetSearchAddress(e.target.value)
            }
    //  지도 정보 얻어오기
    const mapRef = useRef();
    const [info, setInfo] = useState();   
    //  키워드로 장소 검색 state
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()
    //  지도 타입 변경 state
    const [mapTypeIds, setMapTypeIds] = useState([])
    // 지도 타입 변경 핸들러
    const mapTypeChangeHandler = (target, type) => {
        if (target.checked) {
            return setMapTypeIds([...mapTypeIds, type])
        }
        setMapTypeIds(
            mapTypeIds.filter(
            (mapTypeId) => mapTypeId !== type
            )
        )
        console.log("target=> ", target)
    }
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
    //  사용자 (커스텀) 컨트롤러 지도종류
    // const setMapType = (maptype) => {
    //     const map = mapRef.current
    //     const roadmapControl = document.getElementById("btnRoadmap")
    //     const skyviewControl = document.getElementById("btnSkyview")
    //     if (maptype === "roadmap") {
    //         map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP)
    //         roadmapControl.className = "selected_btn"
    //         skyviewControl.className = "btn"
    //     } else {
    //         map.setMapTypeId(kakao.maps.MapTypeId.HYBRID)
    //         skyviewControl.className = "selected_btn"
    //         roadmapControl.className = "btn"
    //     }
    // }
    //  사용자 (커스텀) 컨트롤러 줌 인&아웃
    // const zoomIn = () => {
    //     const map = mapRef.current
    //     map.setLevel(map.getLevel() - 1)
    // }
    // const zoomOut = () => {
    //     const map = mapRef.current
    //     map.setLevel(map.getLevel() + 1)
    // }

    // 주소 입력후 검색 클릭 시 원하는 주소로 이동
    const SearchMapWithAdress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    
    let callback = function(result, status) {
        console.log("kakao에는 뭐가 들어있을까? ->", kakao)
        if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0]
        setState({
            center: { lat: newSearch.y, lng: newSearch.x }
        })
        }
    };
        geocoder.addressSearch(`${searchAddress}`, callback);
    }

        // 키워드 입력후 검색 클릭 시 원하는 키워드의 주소로 이동
        const SearchMapWithKeyword = () => {
        const ps = new kakao.maps.services.Places()
        const placesSearchCB = function(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
            const newSearch = data[0]
            setState({
                center: { lat: newSearch.y, lng: newSearch.x }
            })
        }
        };
        ps.keywordSearch(`${searchAddress}`, placesSearchCB); 
    console.log("kakao가 로드되고 있니? -> ", kakao)

        //  위도, 경도로 지도 이동
    // const getAddress = useCallback((lat, lng) => {
    //     const geocoder = new window.kakao.maps.services.Geocoder();
    
    //     const coord = new window.kakao.maps.LatLng(lat, lng);
    
    //     const callback = function (result, status) {
    //         if (status === window.kakao.maps.services.Status.OK) {
    //         console.log(result[0].address.address_name);
    //         }
    //     };
    //     geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    //     }, []); 
        }
        const { kakao } = window;
    return (
    <div>
        {/* 맵 표시 */}
        <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
        // 지도의 크기
        width: "100%",
        height: "520px",
        }}
        level={4} // 지도의 확대 레벨
        ref={mapRef}
        onCreate={setMap}
        >
        
        {/* 지도 마커표시 */}
        <MapMarker 
        position={state.center}
        image={{
            src: "MaannajanLogo.png", // 마커이미지의 주소.
            size: {
                width: 30,
                height: 38,
            }, // 마커이미지의 크기.
            options: {
                offset: {
                x: 14,
                y: 47,
              }, // 마커이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정.
        }}}
        >
            {/* 마커에 인포윈도우 생성하기 */}
            <div style={{ 
                // padding: "5px",
                color: "#000", 
                }}>Meetup point
            </div>
        </MapMarker>
        
        {/* <MapInfoWindow // 인포윈도우를 생성하고 지도에 표시.
        position={state.center}// 인포윈도우가 표시될 위치.
        removable={true} // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시.
        > */}
        {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
        {/* <div style={{ padding: "5px", color: "#000"}}>Meetup Point</div>
        </MapInfoWindow> */}


        {/* 지도 위 컨트롤러 */}
        <ZoomControl 
        position={kakao.maps.ControlPosition.TOPLEFT} 
        />
        <MapTypeControl
        position={kakao.maps.ControlPosition.TOPLEFT}
        />

        {/* 지도에 교통정보를 표시하도록 지도타입을 추가합니다 */}
        {/* <MapTypeId type={kakao.maps.MapTypeId.TRAFFIC}/> */}
        {/* 지도에 로드뷰 정보가 있는 도로를 표시하도록 지도타입을 추가합니다 */}
        {/* <MapTypeId type={kakao.maps.MapTypeId.ROADVIEW}/> */}
        {/* 지도에 지형정보를 표시하도록 지도타입을 추가합니다 */}
        {/* <MapTypeId type={kakao.maps.MapTypeId.TERRAIN}/> */}

        {/* 지도 타입 체크박스  */}
        {mapTypeIds.map(mapTypeId => <MapTypeId key={mapTypeId} type={mapTypeId} />)}
        {/* Geolocation Button */}
        <div
        style={{position: "relative"}}>
        <button 
        style={{width: "20px", height: "20px", position: "absolute", top: "10px", right: "10px"}}
        onClick={getGeolocationButtonHandler}>
        <img
        src= "myLocation.png" // Geolocation이미지의 주소.
        alt="Geolocation button"
        style={{width: "100%", height: "100%"}}
        />
        </button>
        </div>
        </Map>
        {/* 지도 타입 체크박스 */}
        <input
            type="checkbox"
            onChange={({ target }) => mapTypeChangeHandler(target, kakao.maps.MapTypeId.TERRAIN)}
        />
        지형정보 보기
        <input
            type="checkbox"
            onChange={({ target }) => mapTypeChangeHandler(target, kakao.maps.MapTypeId.TRAFFIC)}
        />
        교통정보 보기
        <input
            type="checkbox"
            onChange={({ target }) => mapTypeChangeHandler(target, kakao.maps.MapTypeId.BICYCLE)}
        />
        자전거 교통정보 보기
        <input
            type="checkbox"
            onChange={({ target }) => mapTypeChangeHandler(target, kakao.maps.MapTypeId.USE_DISTRICT)}
        />
        지적편집도 보기
        {/* 지도 검색 (키워드 및 주소) */}
        <div>
            <input onChange={searchAddressButtonHandler}></input>
            <button type="Submit" onClick={() => {
            SearchMapWithAdress();
            SearchMapWithKeyword();
            }}>검색</button>
        </div>

        {/* 지도 정보 가져오기 */}
        <button onClick={() => {
            const map = mapRef.current
            setInfo({
                center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
                },  
                level: map.getLevel(),
                typeId: map.getMapTypeId(),
                swLatLng: {
                    lat: map.getBounds().getSouthWest().getLat(),
                    lng: map.getBounds().getSouthWest().getLng(),
                },
                neLatLng: {
                    lat: map.getBounds().getNorthEast().getLat(),
                    lng: map.getBounds().getNorthEast().getLng(),
                },
            })
        }}>
        정보
        </button>
        {info && (
            <div>
                <p>위도 : {info.center.lat}</p>
                <p>경도 : {info.center.lng}</p>
                <p>레벨 : {info.level}</p>
                <p>타입 : {info.typeId}</p>
                <p>남서쪽 좌표 : {info.swLatLng.lat}, {info.swLatLng.lng}</p>
                <p>북동쪽 좌표 : {info.neLatLng.lat}, {info.neLatLng.lng}</p>
            </div>
        )}
    
        {/* 일반지도 & 스카이뷰 버튼, 지도 확대, 축소 컨트롤 */}
        {/* <AddMapControlStyle/> */}
        {/* 일반지도 & 스카이뷰 버튼 */}
        {/* <div className="custom_typecontrol radius_border">
            <span
                id="btnRoadmap"
                className="selected_btn"
                onClick={() => setMapType("roadmap")}
            >
            지도
            </span>
            <span
                id="btnSkyview"
                className="btn"
                onClick={() => {
                setMapType("skyview")
                }}
            >
            스카이뷰
            </span>
        </div> */}
        
        {/* 지도 확대, 축소 컨트롤 div */}
        {/* <div className="custom_zoomcontrol radius_border">
            <span onClick={zoomIn}>
                <img
                src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
                alt="확대"
                />
            </span>
            <span onClick={zoomOut}>
                <img
                src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
                alt="축소"
                />
            </span>
        </div> */}
    </div>
    )
}
export default Home


        {/* <div>
        <Map
        center={{ lat: 37.5173319258532, lng: 127.047377408384 }}
        style={{ width: "100%", height: "530px" }}
        >
        <MapMarker position={{ lat: 37.5173319258532, lng: 127.047377408384 }}>
            <div style={{ color: "#000" }}>Meetup point</div>
        </MapMarker>
        </Map>
        </div> */}