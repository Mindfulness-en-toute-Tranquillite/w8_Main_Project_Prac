import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import { FlexColumnCenter, FlexRow } from '@components/Atoms/Flex';
import styled from 'styled-components';
import { LightTheme } from '@components/Themes/theme';
import { ButtonText } from '@components/Atoms/Button';
import { InputArea } from '@components/Atoms/Input';
import MapAppointment from './MapAppointment';


function MapMidPoint() {
  // queryKey에 캐싱하여 값 불러오기위해 queryClient선언
  const queryClient = useQueryClient();
  // getQueryData로 캐싱한 값 MIDPOINTPROP키로 불러오기.
  const midPointProp = queryClient.getQueryData({ queryKey: ['MIDPOINTPROP'] });
  // getQueryData로 캐싱한 값 INPUTVALUESPROP키로 불러오기.
  const InputValuesProp = queryClient.getQueryData({
    queryKey: ['INPUTVALUESPROP'],
  });
  //  map page로 뒤로가기 위한 useRouter선언.
  const moveBackClickButtonHandler = () => {
    window.location.href = '/map';
  };
  //  클릭 선택된 장소를 저장할 state 변수
  const [checkedPlace, setCheckedPlace] = useState('');
  // 중간지점 좌표 받아온 값으로 서버와 통신하여 kakaoAPI값 DB저장 및 목록 불러오기
  const { data, isLoading, isError, refetch } = useQuery(
    {
      queryKey: ['GET_KAKAOAPI'],
      queryFn: async () => {
        const response = await apis.get(
          // 서버 URL
          `/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=술집&radius=1500&page=1&size=15&sort=distance`,
        
        );
        return response;
      },
      //  한 번 실행되고 100분 후 실행되도록. 100분 (단위: 밀리초)
      staleTime: 6000000,
    },
    {
      // 에러 처리
      onError: (error) => {
        console.error(error);
      },
      // 패칭 데이터 상태 변화
      onSettled: (data) => {
        alert(data);
      },
    },
  );

    const [items, setItems] = useState(null);
    const getItems = async (midPointProp, query) => {
        try {
        const response = await apis.get(
            `/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=${query}&radius=1500&page=1&size=15&sort=distance`,
            midPointProp,
        );

        setItems(response.data.documents);
        } catch (e) {
        console.log(e);
        }
    };

    const clickButtonHandler = (midPointProp, query) => {
        getItems(midPointProp, query);
    };

  //  카테고리별 술집 Data 불러오기
  const kakaoApi = data?.data?.documents; // 전체

  useEffect(() => {
    GetSpotsNearbyMidPoint(kakaoApi);
  }, [kakaoApi]);

  //  키워드 검색 로직
  const GetSpotsNearbyMidPoint = (items) => {
    console.log('items', items);
    const { kakao } = window;
    //지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById('map');

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(midPointProp?.lat, midPointProp?.lng), //지도의 중심좌표(중간지점props받은 값으로 해당지점 찍어줌)
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    //지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options);
    // const ps = new kakao.maps.services.Places();
    //  인포윈도우 선언(카카오map api에서 부르기)
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // // 마커를 담을 배열입니다

    const searchForm = document.getElementById('submit_btn');

    if (items) {
      searchForm?.addEventListener('click', function (e) {
        //kakaoApi넣어줘야 작동
        showingOnMap(items);
      });
    }

    // 마커 및 인포윈도우, pagination
    function showingOnMap(data) {
      let markers = [];
      // console.log(data);
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data?.data?.documents);

      const bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < data?.data?.documents.length; i++) {
        displayMarker(data?.data?.documents[i]);
        bounds.extend(
          new kakao.maps.LatLng(
            data?.data?.documents[i].y,
            data?.data?.documents[i].x,
          ),
        );
      }

      map.setBounds(bounds);

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
            if (clickedItem.classList.contains('clicked')) {
              // 추가된 부분
              clickedItem.classList.remove('clicked');
            }
            clickedItem = null;
          }
        }
        // 검색 결과 목록에 추가된 항목들을 제거
        listEl && removeAllChildNods(listEl);
        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();
        for (let i = 0; i < places?.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
          const marker = addMarker(placePosition, i);
          const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표를 추가
          bounds.extend(placePosition);

          // 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우 장소명 표시
          // mouseout 했을 때는 인포윈도우를 닫기
          (function (marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function () {
              displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function () {
              infowindow.close();
            });

            itemEl.onmouseover = function () {
              displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
              infowindow.close();
            };

            itemEl.ondblclick = function () {
              // 라우터로 페이지 이동 시 해당 중간지점 찾아놓은 부분 뒤로 하고 해당 술집 게시판으로 이동
              // router.push(`/alcohols/${places[i]?.id}`)
              // 새 창으로 띄워줌
              window.open(`/alcohols/${places[i]?.id}`, '_blank');
            };
            itemEl.addEventListener('click', function (e) {
              //클릭된 항목을 표시
              clearClickedItem();
              clickedItem = e.currentTarget;
              clickedItem.classList.add('clicked');
              //  검색 후 선택한 값 중 i 번째 값 선언
              const selected = places[i];
              //  검색 후 선택한 값 중 i 번째 값 checkedPlace state에 저장
              setCheckedPlace(selected);
              displayInfowindow(marker, title);
              map.panTo(placePosition);
            });
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }
        // 검색결과 항목들을 검색결과 목록 Element에 추가
        if (listEl) {
          listEl.appendChild(fragment);
          if (menuEl !== null) {
            // menuEl이 null이 아닐 때 scrollTop 속성을 설정
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
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          '<h5>' +
          places.place_name +
          '</h5>';
        if (places.road_address_name) {
          itemStr +=
            '    <span>' +
            places.road_address_name +
            '</span>' +
            '   <span class="jibun gray">' +
            `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
                            </img>` +
            places.address_name +
            '</span>';
        } else {
          itemStr += '<span>' + places.address_name + '</span>';
        }

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수
      function addMarker(position, idx, title) {
        const imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions,
          ),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
          });

        marker.setMap(map); // 지도 위에 마커를 표출
        markers.push(marker); // 배열에 생성된 마커를 추가

        return marker;
      }

      // 지도 위에 표시되고 있는 마커를 모두 제거
      function removeMarker() {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
      // 인포윈도우에 장소명을 표시
      function displayInfowindow(marker, title) {
        const content =
          '<div style="padding:0 3px 0 4px;z-index:1;">' + title + '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수
      function removeAllChildNods(el) {
        if (el && el.hasChildNodes()) {
          while (el.childNodes.length > 0) {
            // changed condition to check if there are still child nodes
            el.removeChild(el.lastChild);
          }
        }
      }

      // 마커를 생성하고 지도에 표시
      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });
        // 마커에 클릭이벤트를 등록
        kakao.maps.event.addListener(marker, 'click', function (mouseEvent) {
          props.setAddress(place);
          infowindow.setContent(`<span>${place.place_name}</span>`);
          infowindow.open(map, marker);
          const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
          map.panTo(moveLatLon);
        });
      }
    }

    showingOnMap(items);
  };
  return (
    <>
      <WebWrapper style={{ borderBottom: '1px solid black' }}>
        <WebWrapperHeight>
          <FlexRow style={{ justifyContent: 'space-between' }}>
            <MoveBackButtonWrapper>
              <ButtonText
                size="xxsm"
                variant="hoverRed"
                label="<  다시 검색하기"
                style={{
                  borderRadius: '2px',
                  position: 'absolute',
                  width: '110px',
                  bottom: '0px',
                  left: '-19px',
                  zIndex: '50',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
                onClick={moveBackClickButtonHandler}
              />
            </MoveBackButtonWrapper>
            <MapSection>
              <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
                <div
                  id="map"
                  center={{
                    lat: midPointProp?.lat,
                    lng: midPointProp?.lng,
                  }}
                  level={3}
                  style={{
                    width: '50vw',
                    height: '90vh',
                    maxWidth: '690px',
                    maxHeight: '90vh',
                  }}
                />
                <DeparturesWrapper>
                  {InputValuesProp?.filter((value) => value !== '').map(
                    (value, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          zIndex: '1000',
                        }}
                      >
                        <div
                          style={{
                            width: '40px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'red', //String.fromCharCode(65 + index)는 A, B, C, D와 같은 알파벳을 생성.
                            margin: '3px 1px 3px 10px', //index가 0부터 시작하기 때문에 65를 더하여 A의 아스키 코드 65부터 시작하도록 설정
                          }}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <InputArea //출발지 받아온 값 Map으로 돌려 그 갯수만큼 input 만들기
                          key={index} //(""값도 카운트가 되는데 그 경우 filter로 제외하고 map으로 돌리기)
                          value={value}
                          type="text"
                          variant="default"
                          size="lg"
                          readOnly={true}
                          style={{
                            width: '100%',
                            margin: '3px 0 3px 10px',
                            padding: '2%',
                            border: '1px solid white',
                            backgroundColor: `${LightTheme.GRAY_50}`,
                            fontFamily: `${'var(--label1-regular)'} Pretendard sans-serif`,
                            fontSize: '14px',
                            lineHeight: '18px',
                            zIndex: '1000',
                          }}
                        />
                      </div>
                    ),
                  )}
                </DeparturesWrapper>
                <FlexColumnCenter
                  style={{ maxWidth: '518px', maxHeight: '90vh' }}
                >
                  <TitleWrapper>
                    <TitleStyled>중간 위치에 있는 </TitleStyled>
                    <Highlighting>술집입니다.</Highlighting>
                    <CategoryWrapper>
                      <ButtonText
                        id="submit_btn"
                        type="submit"
                        size="xxsm"
                        label="술집(종합)"
                        variant="primaryBolder"
                        onClick={() => {
                          clickButtonHandler(midPointProp, '술집(종합)');
                          GetSpotsNearbyMidPoint(items);
                        }}
                      />
                      <ButtonText
                        id="submit_btn2"
                        type="submit"
                        size="xxsm"
                        label="칵테일바"
                        variant="primaryBolder"
                        onClick={() => {
                          clickButtonHandler(midPointProp, '칵테일바');
                          GetSpotsNearbyMidPoint(items);
                        }}
                      />
                      <ButtonText
                        id="submit_btn3"
                        type="submit"
                        size="xxsm"
                        label="일본식주점"
                        variant="primaryBolder"
                        onClick={() => {
                          clickButtonHandler(midPointProp, '일본식주점');
                          GetSpotsNearbyMidPoint(items);
                        }}
                      />
                      <ButtonText
                        id="submit_btn4"
                        type="submit"
                        size="xxsm"
                        label="실내포장마차"
                        variant="primaryBolder"
                        onClick={() => {
                          clickButtonHandler(midPointProp, '실내포장마차');
                          GetSpotsNearbyMidPoint(items);
                        }}
                      />
                      <ButtonText
                        id="submit_btn5"
                        type="submit"
                        size="xxsm"
                        label="요리주점"
                        variant="primaryBolder"
                        onClick={() => {
                          clickButtonHandler(midPointProp, '요리주점');
                          GetSpotsNearbyMidPoint(items);
                        }}
                      />
                      <ButtonText
                        id="submit_btn6"
                        type="submit"
                        size="xxsm"
                        label="호프"
                        variant="primaryBolder"
                        onClick={() => {
                          clickButtonHandler(midPointProp, '호프');
                          GetSpotsNearbyMidPoint(items);
                        }}
                      />
                      <ButtonText
                        id="submit_btn7"
                        type="submit"
                        size="xxsm"
                        label="와인바"
                        variant="primaryBolder"
                        onClick={() => {
                          clickButtonHandler(midPointProp, '와인바');
                          GetSpotsNearbyMidPoint(items);
                        }}
                      />
                    </CategoryWrapper>
                  </TitleWrapper>

                  {items?.map((el) => {
                    return <div key={el.id}>{el.place_name}</div>;
                  })}

                  {/* <div>
                          <div id="menuDiv">
                            <div id="menu_wrap">
                              <div>
                                <div id="map_title"></div>
                              </div>
                              <ul id="placesList"></ul>
                              <div id="pagination"></div>
                            </div>
                          </div>
                        </div> */}
                </FlexColumnCenter>
              </div>
            </MapSection>
          </FlexRow>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div id="create-appointment"></div>
            <ButtonText
              size="lg"
              variant="borderColorWhite"
              label="약속 만들러 가기"
              style={{ width: '100vw' }}
              onClick={() => {
                const element = document.getElementById('create-appointment');
                element.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </WebWrapperHeight>
      </WebWrapper>
      <MapAppointment checkedPlace={checkedPlace} />
    </>
  );
}

export default MapMidPoint;

const TitleWrapper = styled.div`
    margin: 0 0 3px 20px;
`;
const TitleStyled = styled.div`
    font-size: 40px;
    font-weight: 500;
    line-height: 48px;
    font-family: var(--display2-medium) Pretendard sans-serif;
`;
const Highlighting = styled.div`
  //width값있어야 전체 width늘어남..
    width: 487px;
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
    font-family: var(--display2-bold) Pretendard sans-serif;
`;
const DeparturesWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 20%;
    bottom: 10%;
`;
const CategoryWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 32rem;
    flex-direction: row;
    overflow-y: hidden;
    resize: none;
`;
const MoveBackButtonWrapper = styled.div`
    position: absolute;
    z-index: 100;
`;
const MapSection = styled.div`
    #map {
        overflow: hidden;
        border-radius: 8px;
        z-index: "3";
        width: 50vh;
        height: 90vh;
        position: relative;
        overflow: hidden;
    }
    #menuDiv {
        display: flex;
        position: relative;
        height: 50vh;
        z-index: 2;
        font-size: 4px;
        top: 3%;
        overflow: hidden;
    }
    
    #menu_wrap {
        position: relative;
        width: 35rem;
        height: 60vh;
        max-width: 50vw;
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
    
    #keyword {
        width: 100%;
        border: none;
        outline: none;
    }
    
    #placesList h5 {
        color: black;
        font-size: 7px;
        font-weight: 800;
        line-height: 1px;
    }
    
    #placesList li {
        border : 1px solid ${LightTheme.GRAY_100};
        border-radius: 12px
    }
    #placesList .item {
        overflow: hidden;
        cursor: pointer;
        margin-bottom: 5px
    }
    
    #placesList .item .info {
        padding: 3px 0 5px 3px;
    }
    
    #placesList .item span {
        display: block;
        margin-top: 1px;
    }
    #placesList .info .gray {
        color: #9EA4AA;
    }
    
    #placesList .clicked{
        border: 1px solid #3DC060; /* 연하게 테두리(border) 스타일 */
        position: relative; /* ::after 선택자를 위해 position 속성을 추가합니다. */
        border-radius: 12px
    }
    
    #placesList .clicked ::after{
        content: "더블클릭"; /* ::after 선택자를 이용하여 V표를 추가합니다. */
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #3DC060;
        font-weight: bold;
    }
    
    #btnDiv {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    #pagination {
        margin: 10px auto;
        text-align: center;
    }
    #pagination a {
        display: inline-block;
        margin-right: 10px;
        color: #7b7b7b;
    }
    #pagination .on {
        font-weight: bold;
        cursor: default;
        color: #ff6e30;
    }
    #btnOn {
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    #searchBtn {
        width: 20px;
        padding: 0px;
        height: 70px;
        background-color: #ffa230;
        border: none;
        outline: none;
    }
    `;




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