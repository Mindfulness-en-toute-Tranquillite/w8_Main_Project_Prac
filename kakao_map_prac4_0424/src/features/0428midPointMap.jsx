

useEffect(() => {
    KeywordSearchFeat()
},[])
return (
    <WebWrapper>
        <WebWrapperHeight>
        <FlexRow style={{ justifyContent: 'space-between' }}>
    <MapSection>
        {/* <H1Styled style={{textAlign: "center", width: "100%"}}>위치검색</H1Styled> */}

        <form 
        id="form" 
        className="inputForm" 
        // onSubmit={keywordSearchSubmitHandler}
        >
            <div style={{ width: "100%" }}>
                
            </div>
        </form>

                    <div style={{ width: '100%', height: 'calc(100% - 80px)', display: 'flex' }}>
                                <Map 
                                    id='map'
                                    center={{
                                        lat: midPointProp?.lat,
                                        lng: midPointProp?.lng
                                    }}
                                    level={3}
                                    style={{
                                        width: '690px',
                                        height: '803px',
                                    }}
                                    >
                                    <MapMarker
                                        position={{ lat: midPointProp?.lat, lng: midPointProp?.lng }}
                                        >
                                            <div style={{ color: "#000" }}>InfoWindow</div>
                                        </MapMarker>
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
            
                {/* <button
                onClick={keywordSearchSubmitHandler}
                >
                    adasdasds
                </button> */}
                </MapSection>
            </FlexRow>
        </WebWrapperHeight>
    </WebWrapper>
)
}

export default MapMidPoint
const MapSection = styled.div`
/* display: flex; */
#map {
    /* width: 920px;
    height: 600px;
    position: absolute; */
    overflow: hidden;
    border-radius: 8px;
    /* z-index: "1"; */
    width: '50%',
    height: '100%',
    position: "relative"
}
#menuDiv {
    display: flex;
    position: relative;
    z-index: 2;
    font-size: 4px;
}

#menu_wrap {
    position: relative;
    width: 570px;
    height: 430px;
    border-radius: 5px;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.7);
}

/* #map_title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
} */

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

#submit_btn {
    background-color: #F4F5F6;
    color: #7e7979;
    border: none;
    border-radius:10px;
    outline: none;
}

#placesList h6 {
    color: #FF4740;
    font-size: 15px;
}

#placesList li {
    /* list-style: square; */
}
#placesList .item {
    border-bottom: 1px solid #888;
    overflow: hidden;
    cursor: pointer;
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

#placesList .info .tel {
    /* color: #009900; */
}

#placesList .clicked{
    /* background-color: rgba(100, 200, 100, 0.5);
    border: 1px solid rgba(100, 200, 100, 0.8); */
    border: 1px solid #3DC060; /* 연하게 테두리(border) 스타일 */
    position: relative; /* ::after 선택자를 위해 position 속성을 추가합니다. */
    border-radius: 12px
}

#placesList .clicked ::after{
    content: "V"; /* ::after 선택자를 이용하여 V표를 추가합니다. */
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