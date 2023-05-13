import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper'
import { FlexColumnCenter, FlexRow } from '@components/Atoms/Flex'
import styled from 'styled-components';
import { LightTheme } from '@components/Themes/theme';
import { ButtonText } from '@components/Atoms/Button';
import { useRouter } from 'next/router';
import { InputArea } from '@components/Atoms/Input';
import MapAppointment from './MapAppointment';

function MapMidPoint() {
    // queryKey에 캐싱하여 값 불러오기위해 queryClient선언
    const queryClient = useQueryClient();
    // getQueryData로 캐싱한 값 MIDPOINTPROP키로 불러오기.
    const midPointProp = queryClient.getQueryData({queryKey: ['MIDPOINTPROP']});
    // getQueryData로 캐싱한 값 INPUTVALUESPROP키로 불러오기.
    const InputValuesProp = queryClient.getQueryData({queryKey: ['INPUTVALUESPROP']});
    //  map page로 뒤로가기 위한 useRouter선언.
    const router = useRouter();
    //  카테고리 버튼 상태 관리
    const [activeButton, setActiveButton] = useState(null);
    //  카테고리 버튼 상태 관리 Handler
    const handleButtonClick = (button) => {
        setActiveButton(button);
    };
    //  뒤로가기 버튼 핸들러
    const moveBackClickButtonHandler = () => {
        // 데이터 리셋
        // queryClient.removeQueries({queryKey: ['MIDPOINTPROP']});
        // queryClient.setQueryData(['MIDPOINTPROP'], null);
        // 이전 페이지로 이동
        // router.push('/map');

        //라우터의 이점을 활용하지 못한다는 단점있지만, 새로고침 하며 키값 초기화. 다른 방법 고민해보기
        window.location.href = '/map';
    }
    // midPoint값 없으면 오류가는데 방지. midPoint값 없으면 뒤로가기(일부러 새로고침하며 뒤로 = queryKey리셋위해)
    useEffect(() => {
        if (!midPointProp) {
            window.location.href = '/map';
        }
    }, [midPointProp]);
    //  클릭 선택된 장소를 저장할 state 변수
    const [checkedPlace, setCheckedPlace] = useState('')
    // 중간지점 좌표 받아온 값으로 서버와 통신하여 kakaoAPI값 DB저장 및 목록 불러오기
        const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['GET_KAKAOAPI'],
        queryFn: async () => {
        const response = await apis.get(
            // 서버 URL
            `/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=술집&radius=1500&page=1&size=15&sort=distance`,
            //테스트용 서버 URL
            // '/kakaoApi?y=37.534485&x=%20126.994369&query=술집&radius=1500&page=1&size=15&sort=distance',
            // 중간지점 lat,lng값
            midPointProp
        );
        return response;
        },
        //  한 번 실행되고 100분 후 실행되도록. 100분 (단위: 밀리초)
        staleTime: 6000000
    }, 
    {
        // 에러 처리
        onError: (error) => {
            console.error(error);
        },
        // 패칭 데이터 상태 변화
        onSettled: (data) => {
            alert(data);
        }
    });
    //  카테고리별 술집 Data 불러오기
    const kakaoApi = data?.data?.documents
    //  칵테일바 마커 및 리스트 불러오기
    const [cocktailPage, setCocktailPage] = useState(null);
    async function getCocktailPage() {
        const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=칵테일바&radius=1500&page=1&size=15&sort=distance`, midPointProp);
        setCocktailPage(response?.data);
    }
    //  칵테일바 submit button Handler
    const getCocktailPageSubmitHandler = async (e) => {
        e.preventDefault();
        const cocktailPage = await getCocktailPage();
        if (cocktailPage) {
            GetSpotsNearbyMidPoint(cocktailPage?.documents);
        }
        GetSpotsNearbyMidPoint(kakaoApiCocktail)
    };
    const kakaoApiCocktail = cocktailPage?.documents
    //  일본식주점 마커 및 리스트 불러오기
    const [izakayaPage, setIzakayaPage] = useState(null);
    async function getIzakayaPage() {
        const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=일본식주점&radius=1500&page=1&size=15&sort=distance`, midPointProp);
        setIzakayaPage(response?.data);
    }
    //  일본식주점 submit button Handler
    const getIzakayaPageSubmitHandler = async (e) => {
        e.preventDefault();
        const izakayaPage = await getIzakayaPage();
        if (izakayaPage) {
            GetSpotsNearbyMidPoint(izakayaPage?.documents);
        }
        GetSpotsNearbyMidPoint(kakaoApiIzakaya)
    };
    const kakaoApiIzakaya = izakayaPage?.documents
    //  실내포장마차 마커 및 리스트 불러오기
    const [pochaPage, setPochaPage] = useState(null);
    async function getPochaPage() {
        const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=실내포장마차&radius=1500&page=1&size=15&sort=distance`, midPointProp);
        setPochaPage(response?.data);
    }
    //  실내포장마차 submit button Handler
    const getPochaPageSubmitHandler = async (e) => {
        e.preventDefault();
        const pochaPage = await getPochaPage();
        if (pochaPage) {
            GetSpotsNearbyMidPoint(pochaPage?.documents);
        }
        GetSpotsNearbyMidPoint(kakaoApiPocha)
    };
    const kakaoApiPocha = pochaPage?.documents
    //  요리주점 마커 및 리스트 불러오기
    const [diningPubPage, setDiningPubPage] = useState(null);
    async function getDiningPubPage() {
        const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=요리주점&radius=1500&page=1&size=15&sort=distance`, midPointProp);
        setDiningPubPage(response?.data);
    }
    //  요리주점 submit button Handler
    const getDiningPubPageSubmitHandler = async (e) => {
        e.preventDefault();
        const diningPubPage = await getDiningPubPage();
        if (diningPubPage) {
            GetSpotsNearbyMidPoint(diningPubPage?.documents);
        }
        GetSpotsNearbyMidPoint(kakaoApiDiningPub)
    };
    const kakaoApiDiningPub = diningPubPage?.documents
        //  호프 마커 및 리스트 불러오기
        const [hofPage, setHofPage] = useState(null);
        async function getHofPage() {
            const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=호프&radius=1500&page=1&size=15&sort=distance`, midPointProp);
            setHofPage(response?.data);
        }
        //  호프 submit button Handler
        const getHofSubmitHandler = async (e) => {
            e.preventDefault();
            const hofPage = await getHofPage();
            if (hofPage) {
                GetSpotsNearbyMidPoint(hofPage?.documents);
            }
            GetSpotsNearbyMidPoint(kakaoApiHof)
        };
        const kakaoApiHof = hofPage?.documents
        //  와인바 마커 및 리스트 불러오기
        const [winePage, setWinePage] = useState(null);
        async function getWinePage() {
            const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=와인바&radius=1500&page=1&size=15&sort=distance`, midPointProp);
            setWinePage(response?.data);
        }
        //  와인바 submit button Handler
        const getWineSubmitHandler = async (e) => {
            e.preventDefault();
            const winePage = await getWinePage();
            if (winePage) {
                GetSpotsNearbyMidPoint(winePage?.documents);
            }
            GetSpotsNearbyMidPoint(kakaoApiWine)
        };
        const kakaoApiWine = winePage?.documents
        //  오뎅바 마커 및 리스트 불러오기
        const [fishCakePage, setFishCakePage] = useState(null);
        async function getFishCakPage() {
            const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=오뎅바바&radius=1500&page=1&size=15&sort=distance`, midPointProp);
            setFishCakePage(response?.data);
        }
        //  오뎅바 submit button Handler
        const getFishCakeSubmitHandler = async (e) => {
            e.preventDefault();
            const fishCakePage = await getFishCakPage();
            if (fishCakePage) {
                GetSpotsNearbyMidPoint(fishCakePage?.documents);
            }
            GetSpotsNearbyMidPoint(kakaoApiFishCake)
        };
        const kakaoApiFishCake = fishCakePage?.documents

    //  술집 종합 Submit 버튼 Handler (GetSpotsNearbyMidPoint함수 실행)
    const keywordSearchSubmitHandler = (e) => {
        e.preventDefault();
        // 지도 불러오기 및 마커 및 인포윈도우, pagination생성 함수 실행
        GetSpotsNearbyMidPoint(kakaoApi)
    };
    
    // 페이지 렌더링 되자마자 지도 불러오기.@@(한 번 더 실행이 되어야 마커들찍히는 문제 해결 필요)@@
    // useEffect(() => {
    //     keywordSearchSubmitHandler({ preventDefault: () => {} });
    // }, [kakaoApi]);

    useEffect(() => {
        GetSpotsNearbyMidPoint(kakaoApi, kakaoApiCocktail, kakaoApiIzakaya, kakaoApiPocha, kakaoApiDiningPub, kakaoApiHof, kakaoApiWine, kakaoApiFishCake);
      }, [kakaoApi, kakaoApiCocktail, kakaoApiIzakaya, kakaoApiPocha, kakaoApiDiningPub, kakaoApiHof, kakaoApiWine, kakaoApiFishCake]);

    //  키워드 검색 로직
    const GetSpotsNearbyMidPoint =() => {
        const { kakao } = window;
        //지도를 담을 영역의 DOM 레퍼런스
        const container = document.getElementById('map'); 
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(midPointProp?.lat, midPointProp?.lng), //지도의 중심좌표(중간지점props받은 값으로 해당지점 찍어줌)
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        //지도 생성 및 객체 리턴
        const map = new kakao.maps.Map(container, options); 
        const ps = new kakao.maps.services.Places();
        //  인포윈도우 선언(카카오map api에서 부르기)
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        // // 마커를 담을 배열입니다
        let markers = [];
    
    const searchForms = [
        { id: 'submit_btn', api: kakaoApi },
        { id: 'submit_btn2', api: kakaoApiCocktail },
        { id: 'submit_btn3', api: kakaoApiIzakaya },
        { id: 'submit_btn4', api: kakaoApiPocha },
        { id: 'submit_btn5', api: kakaoApiDiningPub },
        { id: 'submit_btn6', api: kakaoApiHof },
        { id: 'submit_btn7', api: kakaoApiWine },
        { id: 'submit_btn8', api: kakaoApiFishCake }
    ];
        
    searchForms.forEach(form => {
        const searchForm = document.getElementById(form.id);
        if (form.api) {
            searchForm?.addEventListener('click', function (e) {
            e.preventDefault();
            showingOnMap(form.api);
            });
        }
    });
        // 마커 및 인포윈도우, pagination
        function showingOnMap(data) {
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);
            const bounds = new kakao.maps.LatLngBounds();
            for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            map.setBounds(bounds)
        
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
            for ( let i=0; i<places?.length; i++ ) {
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

                    itemEl.ondblclick = function () {
                        // 라우터로 페이지 이동 시 해당 중간지점 찾아놓은 부분 뒤로 하고 해당 술집 게시판으로 이동
                        // router.push(`/alcohols/${places[i]?.id}`)
                        // 새 창으로 띄워줌
                        window.open(`/alcohols/${places[i]?.id}`, '_blank');
                    };
                    itemEl.addEventListener("click", function (e) {
                        //클릭된 항목을 표시
                        clearClickedItem();
                        clickedItem = e.currentTarget;
                        clickedItem.classList.add('clicked');
                        //  검색 후 선택한 값 중 i 번째 값 선언
                        const selected = places[i];
                        //  검색 후 선택한 값 중 i 번째 값 checkedPlace state에 저장
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
            console.log("places",places)
            // 카테고리 추출 ("음식점 > 술집" 문자열과 "음식점 > 술집 >"문자열 구분.)
            let category_array = places.category_name.split(" > ");
            let filtedCategory = "";

            for (let i = 2; i < category_array.length; i++) {
            if (category_array[i] !== "음식점") {
                filtedCategory = category_array[i];
                break;
            }
            }
            if (filtedCategory === "") {
                filtedCategory = "술집";
            }
            console.log('카테고리',filtedCategory);
            //
            const el = document.createElement('li');
            let itemStr =
            '<span class="markerbg marker_' + (index + 1) +'"></span>' + '<div class="info">' + 
            '<div class="titleWrapper">'+ '<div class="listTitle">' + places.place_name + "</div>" + '<span class="category">' + filtedCategory + "</span>"+ 
            '<img class="share"/>' + '<img class="heart"/>' + '</div>';
                    if (places.road_address_name) {
                        itemStr +=
                            '<div class="roadAddress">' + places.road_address_name + '</div>' +
                            '<div class="gray">' + "<span>"+ "지번" + "</span>"+ "<span>" + places.address_name +"</span>"+ "</div>";
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
            const content = '<div style="padding:0 3px 0 4px;z-index:1;">' + title + '</div>';
    
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
    }
    }
    return (
    <> 
        <WebWrapper>
            <WebWrapperHeight>
                <FlexRow style={{ justifyContent: 'space-between' }}>
                    <MoveBackButtonWrapper>
                        <ButtonText size='xxsm'variant='hoverRed'
                        label={<><span style={{ fontWeight: '500', fontSize: '20px',marginRight: '16px' }}>&lt;</span> 다시 검색하기</>}
                        style={{ borderRadius : '2px', position: 'absolute', width: '150px', fontSize: '12px',fontWeight: '700',
                            bottom: '-30px',left: '-22px',zIndex: '50', backgroundColor: "transparent", border: 'none' }}
                        onClick={moveBackClickButtonHandler}/>
                    </MoveBackButtonWrapper>
                    <MapSection>
                        <div style={{  display: 'flex' }}>
                            <div>
                                <div id='map' center={{ lat: midPointProp?.lat, lng: midPointProp?.lng}} level={3}
                                    style={{width: '690px', height: '90vh',maxWidth: '690px',maxHeight: '803px',marginTop: '40px'}}/>
                                    <DeparturesWrapper>
                                        {InputValuesProp?.filter(value => value !== "").map((value, index) => ( 
                                            <div key={index} style={{ display: 'flex', alignItems: 'center', zIndex: '100'}}>
                                                <div 
                                                style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'white',
                                                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                                                    color: `${LightTheme.PRIMARY_NORMAL}`, //String.fromCharCode(65 + index)는 A, B, C, D와 같은 알파벳을 생성. 
                                                    margin: '3px 1px 3px 10px'  //index가 0부터 시작하기 때문에 65를 더하여 A의 아스키 코드 65부터 시작하도록 설정
                                                    }}>                     
                                                    {String.fromCharCode(65 + index)} 
                                                </div>
                                            <InputArea       //출발지 받아온 값 Map으로 돌려 그 갯수만큼 input 만들기            
                                                key={index}  //(""값도 카운트가 되는데 그 경우 filter로 제외하고 map으로 돌리기)                
                                                value={value} type="text" variant="default" size="lg" readOnly={true}
                                                style={{width: '273px', height: '34px', margin: '3px 0 3px 10px', padding: '6px',
                                                    border: '1px solid white', borderRadius: '12px', zIndex: '1000',
                                                    backgroundColor: `${LightTheme.WHITE}`,
                                                    font: `${'var(--label1-regular)'} Pretendard sans-serif`,
                                                }}/>
                                            </div>
                                        ))}
                                    </DeparturesWrapper>
                                </div>
                            <FlexColumnCenter style={{maxWidth: '518px',maxHeight: '803px', marginTop: '30px',resize: 'none'}}>
                                <TitleWrapper>
                                    <div style={{font: `${'var(--head1-medium)'} Pretendard sans-serif`,}}>중간 위치에 있는 </div>
                                    <div style={{font: `${'var(--head1-bold)'} Pretendard sans-serif`,}}>술집입니다.</div>
                                </TitleWrapper>
                                        <CategoryWrapper>
                                            <form id="form" className="inputForm" onSubmit={keywordSearchSubmitHandler}>
                                                <CategoryButton id="submit_btn" type="submit" label='술집(종합)' isActive={activeButton === 'button1'}
                                                    onClick={() => handleButtonClick('button1')}>종합</CategoryButton>
                                            </form>
                                            <form id="form" className="inputForm" onSubmit={getCocktailPageSubmitHandler}>
                                                <CategoryButton id="submit_btn2" type="submit" label='칵테일바' isActive={activeButton === 'button2'}
                                                    onClick={() => handleButtonClick('button2')}>칵테일바</CategoryButton>
                                            </form>
                                            <form id="form" className="inputForm" onSubmit={getIzakayaPageSubmitHandler}>
                                                <CategoryButton id="submit_btn3" type="submit" label='일본식주점' isActive={activeButton === 'button3'}
                                                    onClick={() => handleButtonClick('button3')}>일본식주점</CategoryButton>
                                            </form>
                                            <form id="form" className="inputForm" onSubmit={getPochaPageSubmitHandler}>
                                                <CategoryButton id="submit_btn4" type="submit" label='실내포장마차' isActive={activeButton === 'button4'}
                                                    onClick={() => handleButtonClick('button4')}>실내포장마차</CategoryButton>
                                            </form>
                                            <form id="form" className="inputForm" onSubmit={getDiningPubPageSubmitHandler}>
                                                <CategoryButton id="submit_btn5" type="submit" label='요리주점' isActive={activeButton === 'button5'}
                                                    onClick={() => handleButtonClick('button5')}>요리주점</CategoryButton>
                                            </form>
                                            <form id="form" className="inputForm" onSubmit={getHofSubmitHandler}>
                                                <CategoryButton id="submit_btn6" type="submit" label='호프' isActive={activeButton === 'button6'}
                                                    onClick={() => handleButtonClick('button6')}>호프</CategoryButton>
                                            </form>
                                            <form id="form" className="inputForm" onSubmit={getWineSubmitHandler}>
                                                <CategoryButton id="submit_btn7" type="submit" label='와인바' isActive={activeButton === 'button7'}
                                                    onClick={() => handleButtonClick('button7')}>와인바</CategoryButton>
                                            </form>
                                            {/* <form id="form" className="inputForm" onSubmit={getFishCakeSubmitHandler}>
                                                <CategoryButton id="submit_btn8" type="submit" label='오뎅바' isActive={activeButton === 'button8'}
                                                    onClick={() => handleButtonClick('button8')}>오뎅바</CategoryButton>
                                            </form> */}
                                            {/* <SlideDirectIconStyle/> */}
                                        </CategoryWrapper>
                                
                                <div>
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
                                    <div style={{
                                    display: 'flex', 
                                    justifyContent: 'flex-end' 
                                    }}>
                                    <LabelInfoDBClick>리스트  더블  클릭  시  가게  정보로  이동합니다.</LabelInfoDBClick>
                                    <div id="create-appointment"></div>
                                    <div style={{position: 'absolute', top:'106%', left:'70%'}}>
                                        <ButtonText size="lg" variant="activeRed" label="약속 잡으러 가기" hoverBackgroundColor = {LightTheme.HOVER_BASIC}
                                            style={{width: '170px',paddingRight: '1px', zIndex: '1',
                                                font: `var(--label2-bold) Pretendard sans-serif`,
                                                backgroundImage: `url(RedBottomDirection.png)`, //Icon 불러오기
                                                backgroundRepeat: 'no-repeat', //이미지 한번만
                                                backgroundPosition: '21px center', // 위치
                                                backgroundSize: '16px', // 이미지 크기
                                                boxSizing: 'border-box',
                                            }}
                                            onClick={() => {
                                            const element = document.getElementById('create-appointment');
                                            element.scrollIntoView({ behavior: 'smooth' });
                                            }}/>
                                    </div>
                                    </div>
                                </div>
                            </FlexColumnCenter>
                        </div>
                    </MapSection>
                </FlexRow>
            </WebWrapperHeight>
        </WebWrapper>
        <MapAppointment checkedPlace={checkedPlace}/>
    </>   
    )
    }
    
    export default MapMidPoint

    const TitleWrapper = styled.div`
    margin: 0 0 3px 20px;
    /* height: 100vh; */
    overflow-y: hidden;
    `
    const DeparturesWrapper = styled.div`
    position:absolute;
    display: flex;
    flex-direction: column;
    width: 319px;
    top: 76%;
    `
    const CategoryWrapper = styled.div`
        display: flex;
        justify-content: flex-start;
        width: 450px;
        max-width: 470px;
        margin: 2px 0 2px 20px;
        overflow-x: scroll;
        white-space: nowrap;
        resize: none; 
        /* background-color:gray; */
        /* justify-content: flex-end; */
        /* align-items: flex-end; */
        /* overflow-x: auto; */
        /* overflow: hidden;
        overflow-y: hidden; */
    ::-webkit-scrollbar {
        width: 1px;
        height: 3px;
    }
    /* ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }
    ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);
    } */
    `;
    const MoveBackButtonWrapper = styled.div`
    position: absolute;
    z-index: 100;
    font: var(--label2-regular) Pretendard sans-serif;
    `
    const CategoryButton = styled.button`
        padding: 3px 15px;
        font-size: 14px;
        border-radius: 16px;
        font: var(--label2-regular) Pretendard sans-serif;
        background-color: ${({ isActive }) => (isActive ? `${LightTheme.PRIMARY_NORMAL}` : `${LightTheme.WHITE}`)};
        color: ${({ isActive }) => (isActive ? `${LightTheme.WHITE}` : `${LightTheme.BLACK}`)};
        border-style: solid;
        border-width: 1px;
        border-color:${({ isActive }) => (isActive ? `${LightTheme.PRIMARY_NORMAL}` : `${LightTheme.BLACK}`)};
        &:hover {
            background-color: ${LightTheme.PRIMARY_NORMAL};
            border-color: ${LightTheme.PRIMARY_NORMAL};
            color: ${LightTheme.WHITE};
    }
    `
    const SlideDirectIconStyle = styled.div`
        position: absolute;
        /* left: 83.5%; */
        right: 295px;
        top: 205px;
        bottom: 83.07%;
        background-image: url('/CategorySlideDirection.png');
        background-repeat: no-repeat;
        width: 20px;
        height: 15px;
        `;
    const MapSection = styled.div`
    #map {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        z-index: 3;
    }
    #menuDiv {
        display: flex;
        position: relative;
        height: 97%;
        max-width:622px;
        max-height:782px;
        z-index: 2;
        font-size: 4px;
        overflow: hidden;
    }
    
    #menu_wrap {
        position: relative;
        width: 470px;
        height: 65vh;
        max-width: 470px;
        max-height: 647px;
        border-radius: 5px;
        overflow-y: auto;
    ::-webkit-scrollbar {
        width: 4px;
        height: 1px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }
    ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);
    }
    }
    
    #form {
        display: flex;
        justify-content: space-between;
        padding: 0px 15px 10px 0;
    }
    #placesList .titleWrapper {
        display: flex;
        align-items: center;
        color: ${LightTheme.FONT_PRIMARY};
        font: var(--title2-semibold) Pretendard sans-serif;
    }

    #placesList .listTitle {
        /* font-size: 7px;
        font-weight: 800;
        line-height: 1px; */
        display: flex;
        justify-content: space-between;
        color: ${LightTheme.FONT_PRIMARY};
        font: var(--title2-semibold) Pretendard sans-serif;
    }
    
    #placesList .category {
        margin-left: 20px;
        color: ${LightTheme.FONT_SECONDARY};
        font: var(--caption2-regular) Pretendard sans-serif;
        font-size: 11px;
    }

    /* #placesList .share {
        margin-left: 200px;
        border: none;
        background-image: url('/shareButton.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 20px;
        height: 15px;
    } */
        /* #placesList .share {
        margin-left: 189px;
        border: none;
        background-image: url('/heartButton.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 20px;
        height: 15px;
    } */

    #placesList li {
        
    }
    #placesList .item {
        overflow: hidden;
        cursor: pointer;
        margin: 0 8px 4px -20px;
        border : 1px solid ${LightTheme.GRAY_100};
        border-radius: 8px;

    }
    
    #placesList .item .info {
        padding: 3px 0 5px 3px;
        margin: 6px 12px 6px 12px;
    }
    
    #placesList .item span {
        display: block;
        margin-top: 1px;
        font: var(--caption2-regular) Pretendard sans-serif;
    }
    #placesList .info .roadAddress {
        marginTop: 4px;
        color: ${LightTheme.FONT_PRIMARY};
        font: var(--label2-regular) Pretendard sans-serif;
    }
    #placesList .info .gray {
        display: flex;
        gap: 16px;
        margin-top: 25px;
        color: ${LightTheme.FONT_SECONDARY};
        font: var(--caption2-regular) Pretendard sans-serif;
    }
    
    #placesList .clicked{
        border: 1px solid ${LightTheme.STATUS_POSITIVE};
        position: relative; /* ::after 선택자를 위해 position 속성을 추가합니다. */
        border-radius: 10px
    }
    
    #placesList .clicked ::after{
        content: ""; /* ::after 선택자를 이용하여 V표를 추가합니다. */
        position: absolute;
        left: 90%;
        right: 21.11%;
        top: 48%;
        /* bottom: 68.81%; */
        transform: translateY(-50%);
        font-weight: bold;
        background-image: url('/Group 2066.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 20px;
        height: 15px;
    }
    `;
    const LabelInfoDBClick = styled.div`
    /* position: absolute;  */
    /* left: 60rem; */
    /* top:110vh; */
    /* margin: 10px 0 0 20px */
    display: flex;
    justify-content: flex-end; 
    padding: 5px 0 0 0;
    color: ${LightTheme.FONT_SECONDARY};
    font: var(--label2-regular) Pretendard sans-serif;
    letter-spacing: 1px; /* 글자 간격을 1px로 설정 */
    `