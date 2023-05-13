const { Map } = require("react-kakao-maps-sdk");

//  키워드 검색 로직
function KeywordSearchFeat () {
    const { kakao } = window;
    const map = new kakao.maps.Map(document.getElementById('myMap'), 
    {
        center: new kakao.maps.LatLng(37.5546788388674, 126.970606917394),
        level: 3
    });
    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // 마커를 담을 배열입니다
    let markers = [];

    const searchForm = document.getElementById('submit_btn');
    if (searchForm) {
        searchForm.addEventListener('click', function (e) {
        e.preventDefault();
        searchPlaces();
        });
    }
    
    function searchPlaces() {
        const keyword = document.getElementById("keyword").value;
        if (!keyword?.replace(/^\s+|\s+$/g, "")) {
            alert("키워드를 입력해주세요!");
            return;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청
    ps.keywordSearch(keyword, placesSearchCB);
    }
    console.log("keyword -> ", keyword)
    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);
            // 페이지 목록 보여주는 displayPagination() 추가
            displayPagination(pagination);
            // setPlaces(data)

        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds)

        // 정상적으로 검색이 완료됐으면
        }   else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            // return;
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            // return;
        }
    }
    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
        const listEl = document.getElementById('placesList');
        const menuEl = document.getElementById('menu_wrap');
        const fragment = document.createDocumentFragment();
        const bounds = new kakao.maps.LatLngBounds();
        //  클릭된 항목에 대한 표시를 유지하기 위해 변수
        let clickedItem = null;
        //  클릭된 항목이 있다면 그 항목의 표시를 초기화하는 함수
        function clearClickedItem() {
            if (clickedItem !== null) {
                if (clickedItem.classList.contains('clicked')) { // 추가된 부분
                    clickedItem.classList.remove('clicked');
                }
                clickedItem = null;
            }
        }
        // 검색 결과 목록에 추가된 항목들을 제거
        listEl && removeAllChildNods(listEl);
        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();
        for ( let i=0; i<places.length; i++ ) {
            // 마커를 생성하고 지도에 표시합니다
            const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
            const marker = addMarker(placePosition, i);
            const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표를 추가
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우 장소명 표시
            // mouseout 했을 때는 인포윈도우를 닫기
            (function(marker, title) {
                kakao.maps.event.addListener(
                    marker, 
                    'mouseover', 
                    function() {
                    displayInfowindow(marker, title);
                    }
                );

                kakao.maps.event.addListener(
                    marker, 
                    'mouseout', 
                    function() {
                    infowindow.close();
                    }
                );

                itemEl.onmouseover =  function () {
                    displayInfowindow(marker, title);
                };

                itemEl.onmouseout =  function () {
                    infowindow.close();
                };
                itemEl.addEventListener("click", function (e) {
                    //클릭된 항목을 표시
                    clearClickedItem();
                    clickedItem = e.currentTarget;
                    clickedItem.classList.add('clicked');
                    //  검색 후 선택한 값 중 i 번째 값 선언
                    const selected = places[i];
                    //  검색 후 선택한 값 중 i 번째 값 state에 저장
                    setCheckedPlace(selected)

                    displayInfowindow(marker, title);
                    map.panTo(placePosition);
                });
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
        }
        // 검색결과 항목들을 검색결과 목록 Element에 추가
        if (listEl) {
            listEl.appendChild(fragment);
            if (menuEl !== null) { // menuEl이 null이 아닐 때 scrollTop 속성을 설정
                menuEl.scrollTop = 0;
            }
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
    }
    // 검색결과 항목을 Element로 반환하는 함수
    function getListItem(index, places) {
        const el = document.createElement('li');
        let itemStr =
        '<span class="markerbg marker_' + (index + 1) +'"></span>' + '<div class="info">' + "<h5>" + places.place_name + "</h5>";
                if (places.road_address_name) {
                    itemStr +=
                        "    <span>" +
                        places.road_address_name +
                        "</span>" +
                        '   <span class="jibun gray">' +
                        `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
                        </img>` +
                        places.address_name +
                        "</span>";
                } else {
                    itemStr += "<span>" + places.address_name + "</span>";
                }
        
                    // itemStr +=
                    // '  <span class="tel">' + places/*.phone*/ + "</span>" + "</div>";
            
                    el.innerHTML = itemStr;
                    el.className = "item";
        
                    return el;
                }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMarker(position, idx, title) {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage 
            });

        marker.setMap(map); // 지도 위에 마커를 표출
        markers.push(marker);  // 배열에 생성된 마커를 추가

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거
    function removeMarker() {
        for ( let i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }   
        markers = [];
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
    // 인포윈도우에 장소명을 표시
    function displayInfowindow(marker, title) {
        const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수
    function removeAllChildNods(el) {
        if (el && el.hasChildNodes()) {
            while (el.childNodes.length > 0) { // changed condition to check if there are still child nodes
                el.removeChild(el.lastChild);
            }
        }
    }
    
    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
        const paginationEl = document.getElementById('pagination');
        const fragment = document.createDocumentFragment();
        // 기존에 추가된 페이지 번호 삭제
        while (paginationEl?.hasChildNodes()) {
            paginationEl.lastChild &&
            paginationEl.removeChild(paginationEl.lastChild)
        }

        for (let i = 1; i <= pagination.last; i++) {
            const el = document.createElement('a')
            el.href = '#'
            el.innerHTML = i

            if (i === pagination.current) {
            el.className = 'on';
            } else {
            el.onclick = (function (i) {
                return function () {
                pagination.gotoPage(i)
                }
            })(i)
            }

            fragment.appendChild(el)
        }
        // paginationEl이 null이 아닐 때 appendChild 메소드를 호출
        if (paginationEl !== null) { 
            paginationEl.appendChild(fragment);
        }
    }
    // 마커를 생성하고 지도에 표시
    function displayMarker(place) {
        let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
        });
        // 마커에 클릭이벤트를 등록
        kakao.maps.event.addListener(marker, 'click', function(mouseEvent) {
            props.setAddress(place);
            infowindow.setContent(`<span>${place.place_name}</span>`);
            infowindow.open(map, marker);
            const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
            map.panTo(moveLatLon);
        });
        
    }
return (
    <div className="modal">
    <div className="modal-overlay">

    <section>
        <h1 style={{textAlign: "center", width: "100%"}}>위치검색</h1>

        <form id="form" className="inputForm" onSubmit={keywordSearchSubmitHandler}>
            <div style={{ width: "100%" }}>
                <input 
                    id="keyword"
                    type="text" 
                    placeholder="위치를 입력해주세요."
                    onChange={inputTextHandler} 
                    value={inputText}
                    color='default'
                    style={{border: '1px solid #9EA4AA', borderRadius: '12px'}}
                />
                <button
                    id="submit_btn" 
                    type="submit"
                >
                    검색
                </button>
            </div>
        </form>

        <div style={{ width: '100%', height: 'calc(100% - 80px)', display: 'flex' }}>
            
                <Map
                    id='myMap'
                    center={{
                        lat: 37.56682420267543,
                        lng: 126.978652258823
                    }}
                    level={3}
                    style={{
                        width: '50%',
                        height: '105%',
                        position: "relative"
                    }}
                >
                </Map>
                <div style={{width: '50%'}}>
                    
                    <div id="menuDiv">
                        <div id="menu_wrap">
                            <div>
                                <div id="map_title">
                                </div>
                            </div>
                                <ul id="placesList"></ul>
                                <div id="pagination"></div>
                        </div>
                    </div>
                </div>
            
        </div>
    </section>

        <button
            style={{
                cursor: 'pointer',
                color: 'white',
                backgroundColor: '#FF4740',
                border: 'none',
                borderRadius: '8px',
                position: "absolute",
                bottom: "20px",
                right: "20px", 
                fontSize: "13px",
                padding: "6px 20px 6px 20px"
            }}
            onClick={saveStateHandler}
        >
            확인
        </button>

    </div>
    </div>
)
}