import React, { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

function KeywordMapSearch(){
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()
  
    useEffect(() => {
      if (!map) return
      const ps = new kakao.maps.services.Places()
  
      ps.keywordSearch("이태원 맛집", (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색 결과 목록과 마커를 표출하는 함수
          displayPlaces(data);
          // 검색 결과 목록 하단에 페이지번호를 표시하는 함수
          displayPagination(pagination);
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds()
          let markers = []
  
          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            })
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
          setMarkers(markers)
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds)
        }
      })
    }, [map])
    
    function displayMarker(place) {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      window.kakao.maps.event.addListener(marker, "click", function (mouseEvent) {
          props.setAddress(place);
          infowindow.setContent(`
          <span>
          ${place.place_name}
          </span>
          `);
          infowindow.open(map, marker);
          const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
          map.panTo(moveLatLon);
        }
      );
    }
    return (
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info &&info.content === marker.content && (
              <div style={{color:"#000"}}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    )
  }
export default KeywordMapSearch