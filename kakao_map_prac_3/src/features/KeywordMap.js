import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function KeywordMap() {
  const [info, setInfo] = useState(null);
  //  맵 마커 state
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  //  검색 값 state
  const [word, setWord] = useState('');

  const onChangeSearch = (e) => {
    setWord(e.target.value); 
  };

  const searchPlaces = () => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch({ keyword: word }, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
        // LatLngBounds 객체에 좌표를 추가합니다.
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = [];

        for (let i = 0; i < data.length; i++) {
          newMarkers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });

          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        setMarkers(newMarkers);
        map.setBounds(bounds);
      }
    });
  };

  useEffect(() => {
    const searchForm = document.getElementById('submit_btn');

    searchForm?.addEventListener('click', function (e) {
      e.preventDefault();
      searchPlaces();
    });

    return () => {
      searchForm?.removeEventListener('click', function (e) {
        e.preventDefault();
        searchPlaces();
      });
    };
  }, [map, word]);

  return (
    <div>
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        style={{ width: '100%', height: '350px' }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: '#000' }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>

      <input
        type="text"
        value={word}
        id="keyword"
        placeholder="주소나 키워드를 검색해주세요."
        onChange={onChangeSearch}
      />

      <form>
        <button id="submit_btn" onClick={searchPlaces}>
          검색
        </button>
      </form>
    </div>
  );
}

export default KeywordMap;