    function displayPlaces(places) {
        //
        const placeMidPointPosition = new kakao.maps.LatLng(midPointProp.lat, midPointProp.lng);
        //addMidPointMarker 추가
        const marker = addMidPointMarker(placeMidPointPosition)
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표를 추가
        bounds.extend(placeMidPointPosition);
    }
    // 마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMidPointMarker(position, idx, title) {
        const imageSrc = 'MaannajanLogo.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                position: midPointProp, // 마커의 위치
                image: markerImage 
            });

        marker.setMap(map); // 지도 위에 마커를 표출
        // markers.push(marker);  // 배열에 생성된 마커를 추가

        return marker;
    }



    // 조합

        function MidPointMarkerFunction() {
            // 검색 목록과 마커를 표출합니다
            displayMidPointPlaces(midPointProp);
            // 페이지 목록 보여주는 displayPagination() 추가
        const bounds = new kakao.maps.LatLngBounds();
        // displayMidPointMarker(midPointProp);
            bounds.extend(new kakao.maps.LatLng(midPointProp.lat, midPointProp.lng));
        map.setBounds(bounds)
        
        function displayMidPointPlaces() {
            //
            const placeMidPointPosition = new kakao.maps.LatLng(midPointProp.lat, midPointProp.lng);
            //addMidPointMarker 추가
            const MidPointMarker = addMidPointMarker(placeMidPointPosition)
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표를 추가
            bounds.extend(placeMidPointPosition);
        }
        //마커를 생성하고 지도 위에 마커를 표시하는 함수
        function addMidPointMarker(position, idx, title) {
            const imageSrc = 'MaannajanLogo.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                imgOptions =  {
                    spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                MidPointMarker = new kakao.maps.Marker({
                    position: midPointProp, // 마커의 위치
                    image: markerImage 
                });
                MidPointMarker.setMap(map); // 지도 위에 마커를 표출
            // markers.push(marker);  // 배열에 생성된 마커를 추가
            return MidPointMarker;
        }
            function displayMidPointMarker() {
                let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(midPointProp.lat, midPointProp.lng)
                });
        }
    }