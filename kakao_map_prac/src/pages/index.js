import { useCallback, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk"


function Home() {
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.49676871972202, lng: 127.02474726969814 },
        // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
        isPanto: true,
        });
        const [searchAddress, SetSearchAddress] = useState();
        // 지도 검색 버튼
        const searchAddressButtonHandler = (e) => {
            SetSearchAddress(e.target.value)
            }

        // 주소 입력후 검색 클릭 시 원하는 주소로 이동
    const SearchMapWithAdress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    
    let callback = function(result, status) {
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
    return (
    <div>
        <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
        // 지도의 크기
        width: "100%",
        height: "520px",
        }}
       level={3} // 지도의 확대 레벨
        />

        <div>
            <input onChange={searchAddressButtonHandler}></input>
            <button onClick={() => {
            SearchMapWithAdress();
            SearchMapWithKeyword();
            }}>클릭</button>
        </div>
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