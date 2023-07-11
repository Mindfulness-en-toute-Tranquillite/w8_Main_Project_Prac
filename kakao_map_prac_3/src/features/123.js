import { Map } from "react-kakao-maps-sdk";

<MapSection>
<Map
    id='myMap'
    center={{
        lat: 37.56682420267543,
        lng: 126.978652258823
    }}
    level={4}
    style={{
        width: '50%',
        height: '100%',
        position: "relative"
    }}
>
{/* <MapContainer/> */}
</Map>
<div style={{width: '50%'}}>
    
    <div id="menuDiv">
    <div id="menu_wrap">
        <div>
            <div id="map_title">
                <div>만나잔</div>
            </div>
            <form 
            className="inputForm" 
            id="form"
            onSubmit={handleSubmit}
            >
                <input
                    placeholder="Search Place..."
                    onChange={onChange}
                    id="keyword"
                    value={inputText} 
                    
                />
                <button 
                    id="submit_btn" 
                    type="submit"
                >검색
                </button>                           
            </form>
        </div>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
    </div>
</div>

</div>
</MapSection>





const MapSection = styled.div`
    display: flex;
    #map {
        width: 920px;
        height: 600px;
        position: absolute;
        overflow: hidden;
        border-radius: 20px;
        /* z-index: "1"; */
    }
    #menuDiv {
        display: flex;
        position: relative;
        z-index: 2;
        font-size: 12px;
    }

    #menu_wrap {
        position: relative;
        width: 400px;
        height: 600px;
        border-radius: 20px;
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.7);
    }

    #map_title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 10px;
    }

    #form {
        display: flex;
        justify-content: space-between;
        padding: 0px 15px 10px 15px;
    }

    #keyword {
        width: 100%;
        border: none;
        outline: none;
    }

    #submit_btn {
        background-color: #ff6e30;
        border: none;
        outline: none;
    }

    #placesList h5 {
        color: #ff6e30;
    }

    #placesList li {
        list-style: square;
    }
    #placesList .item {
        border-bottom: 1px solid #888;
        overflow: hidden;
        cursor: pointer;
    }

    #placesList .item .info {
        padding: 10px 0 10px 5px;
    }

    #placesList .item span {
        display: block;
        margin-top: 4px;
    }
    #placesList .info .gray {
        color: #8a8a8a;
    }

    #placesList .info .tel {
        color: #009900;
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