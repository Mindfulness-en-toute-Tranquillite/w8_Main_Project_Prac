import { useState, useEffect } from 'react';

function Sample5() {
  const [address, setAddress] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // 지도를 표시할 div
    const mapContainer = document.getElementById('map');

    // 지도의 중심좌표와 확대 레벨
    const center = new window.kakao.maps.LatLng(33.450701, 126.570667); //Replace daum with window.kakao
    const mapOption = {
      center: center,
      level: 5,
    };
    //지도를 생성하고 map state를 업데이트합니다.
    const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(newMap);

    //마커를 생성하고 marker state를 업데이트합니다.
    const newMarker = new window.kakao.maps.Marker({ //Replace daum with window.kakao
      position: new window.kakao.maps.LatLng(37.537187, 127.005476), //Replace daum with window.kakao
      map: newMap,
    });
    setMarker(newMarker);

    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new window.kakao.maps.services.Geocoder(); //Replace daum with window.kakao

    // 주소 검색 버튼을 클릭했을 때 실행되는 함수입니다.
    const handleSearchAddress = () => {
      new window.kakao.Postcode({ //Replace daum with window.kakao
        oncomplete: function(data) {
            const addr = data.address; // 최종 주소 변수

            // 주소 정보를 state에 업데이트합니다.
            setAddress(addr);

            // 주소로 상세 정보를 검색합니다.
            geocoder.addressSearch(data.address, function(results, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === window.kakao.maps.services.Status.OK) { //Replace daum with window.kakao
                const result = results[0]; //첫번째 결과의 값을 활용

                // 해당 주소에 대한 좌표를 받아서
                const coords = new window.kakao.maps.LatLng(result.y, result.x); //Replace daum with window.kakao
                // 지도를 보여줍니다.
                mapContainer.style.display = 'block';
                map.relayout();
                // 지도 중심을 변경합니다.
                map.setCenter(coords);
                // 마커를 결과값으로 받은 위치로 옮깁니다.
                marker.setPosition(coords);
                }
            });
            },
        }).open();
    }

    // 컴포넌트가 언마운트될 때 실행되는 함수입니다.
    // 맵과 마커를 제거합니다.
    return () => {
        newMap && newMap.remove();
        newMarker && newMarker.setMap(null);
    };
  }, []); //마운트 후 최초 1회만 실행합니다.

    return (
      <div>
          <input
              type="text"
              id="sample5_address"
              placeholder="주소"
              value={address}
              readOnly
          />
          <input
              type="button"
              onClick={() => {handleSearchAddress()}}
              value="주소 검색"
          />
          <br />
          <div id="map" style={{ width: '300px', height: '300px', marginTop: '10px', display: 'none' }}></div>
      </div>
    );
}

export default Sample5;