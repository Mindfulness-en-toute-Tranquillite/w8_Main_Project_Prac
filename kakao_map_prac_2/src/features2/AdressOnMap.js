    // import { useState } from 'react';

    // export default function MapPage() {
    // const [markers, setMarkers] = useState([]);
    // const [map, setMap] = useState(null);
    // const [places, setPlaces] = useState([]);

    // function searchPlaces() {
    //     const keyword = document.getElementById('keyword').value.trim();
    //     if (!keyword) {
    //     alert('키워드를 입력해주세요!');
    //     return false;
    //     }
    //     const ps = new kakao.maps.services.Places();
    //     ps.keywordSearch(keyword, placesSearchCB);
    // }

    // function placesSearchCB(data, status, pagination) {
    //     if (status === kakao.maps.services.Status.OK) {
    //     const places = data.map((place, index) => ({
    //         ...place,
    //         markerIndex: index,
    //     }));
    //     setPlaces(places);
    //     displayPlaces(places);
    //     displayPagination(pagination);
    //     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    //     alert('검색 결과가 존재하지 않습니다.');
    //     } else if (status === kakao.maps.services.Status.ERROR) {
    //     alert('검색 결과 중 오류가 발생했습니다.');
    //     }
    // }

    // function displayPlaces(places) {
    //     const listEl = document.getElementById('placesList');
    //     const menuEl = document.getElementById('menu_wrap');
    //     removeAllChildNods(listEl);
    //     removeMarker();
    //     const bounds = new kakao.maps.LatLngBounds();
    //     const markers = places.map((place) => {
    //     const position = new kakao.maps.LatLng(place.y, place.x);
    //     const marker = addMarker(position, place.markerIndex);
    //     bounds.extend(position);
    //     kakao.maps.event.addListener(marker, 'mouseover', () =>
    //         displayInfowindow(marker, place.place_name)
    //     );
    //     kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
    //     return marker;
    //     });
    //     setMarkers(markers);
    //     const fragment = document.createDocumentFragment();
    //     places.forEach((place, index) => {
    //     const itemEl = getListItem(index, place);
    //     itemEl.onmouseover = () => displayInfowindow(markers[index], place.place_name);
    //     itemEl.onmouseout = () => infowindow.close();
    //     fragment.appendChild(itemEl);
    //     });
    //     listEl.appendChild(fragment);
    //     menuEl.scrollTop = 0;
    //     if (map) {
    //     map.setBounds(bounds);
    //     }
    // }

    // // 검색결과 항목을 Element로 반환하는 함수입니다
    // function getListItem(index, places) {
    //     const itemStr = (
    //         <li className="item">
    //             <span className={`markerbg marker_${index + 1}`} />
    //             <div className="info">
    //                 <h5>{places.place_name}</h5>
    //                 {places.road_address_name ? (
    //                     <>
    //                         <span>{places.road_address_name}</span>
    //                         <span className="jibun gray">{places.address_name}</span>
    //                     </>
    //                 ) : (
    //                     <span>{places.address_name}</span>
    //                 )}
    //                 <span className="tel">{places.phone}</span>
    //             </div>
    //         </li>
    //     );
        
    //     return itemStr;
    //     }
    //     // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    //     function addMarker(position, idx, title) {
    //     const imageSrc =
    //     'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //     const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
    //     const imgOptions = {
    //     spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
    //     spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    //     offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    //     };
    //     const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    //     const marker = new kakao.maps.Marker({
    //     position: position, // 마커의 위치
    //     image: markerImage,
    //     });
    //     marker.setMap(map); // 지도 위에 마커를 표출합니다
    // markers.push(marker); // 배열에 생성된 마커를 추가합니다

    // return marker;
    // }

    // // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    // function removeMarker() {
    // for (let i = 0; i < markers.length; i++) {
    // markers[i].setMap(null);
    // }
    // markers = [];
    // }

    // // 검색결과 목록 하단에 페이지번호를 표시하는 함수입니다
    // function displayPagination(pagination) {
    // const paginationEl = document.getElementById('pagination');
    // removeAllChildNodes(paginationEl);
    // const fragment = document.createDocumentFragment();
    // for (let i = 1; i <= pagination.last; i++) {
    //     const el = (
    //         <a href="#" onClick={() => pagination.gotoPage(i)} className={i === pagination.current ? 'on' : ''}>
    //             {i}
    //         </a>
    //     );
    //     fragment.appendChild(el);
    // }
    // paginationEl.appendChild(fragment);
    // }

    // // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // // 인포윈도우에 장소명을 표시합니다
    // function DisplayInfowindow({ marker, title }) {
    //     const content = <div style={{ padding: '5px', zIndex: '1' }}>{title}</div>;
        
    //     infowindow.setContent(content);
    //     infowindow.open(map, marker);
    //     }
        
    //     // 검색 결과 목록의 자식 Element를 제거하는 함수입니다.
    //     function RemoveAllChildNodes({ el }) {
    //     while (el.hasChildNodes()) {
    //     el.removeChild(el.lastChild);
    //     }
    //     }
    // }