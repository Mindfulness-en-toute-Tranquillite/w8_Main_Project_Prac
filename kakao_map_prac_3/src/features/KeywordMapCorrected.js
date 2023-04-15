import React, { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const MapContainer = ({ searchPlace }) => {
const { kakao } = window;
const [map, setMap] = useState(null);
const [places, setPlaces] = useState([]);
const [infowindow, setInfowindow] = useState(null);

useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
    };
    const newMap = new kakao.maps.Map(container, options);
    setMap(newMap);
    setInfowindow(new kakao.maps.InfoWindow({ zIndex: 1 }));
}, []);

useEffect(() => {
    if (!searchPlace || !map) {
        return;
    }
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchPlace, placesSearchCB);
}, [searchPlace, map]);

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        const newPlaces = [];
        for (let i = 0; i < data.length; i++) {
            const place = data[i];
            displayMarker(place);
            bounds.extend(new kakao.maps.LatLng(place.y, place.x));
            newPlaces.push(place);
        }
        setPlaces(newPlaces);
        map.setBounds(bounds);
        displayPagination(pagination);
    }
}

function displayMarker(place) {
    let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
    });

    kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}

function displayPagination(pagination) {
    const paginationEl = document.getElementById('pagination');
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;
        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = () => pagination.gotoPage(i);
        }
        fragment.appendChild(el);
    }
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }
    paginationEl.appendChild(fragment);
}

return null;
};

const MapContainerWrapper = () => {
const [inputText, setInputText] = useState("");
const [place, setPlace] = useState("");
const onChange = (e) => {
    setInputText(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
};

return (
    <>
        <div>
            <Map
                center={{
                    lat: 37.566826,
                    lng: 126.9786567
                }}
                level={3}
                id='myMap'
                style={{
                    width: "100%",
                    height: "350px"
                }}>
                <MapContainer searchPlace={place} />
            </Map>
            <form className="inputForm" onSubmit={handleSubmit}>
                <input
                    placeholder="장소 검색..."
                    onChange={onChange}
                    value={inputText} />
                <button type="submit">
                </button>
            </form>
            <div id="result-list">
                {Places.map((item, i) => (
                <div key={i} style={{ marginTop: '20px' }}>
                    <span>{i + 1}</span>
                    <div>
                    <h5>{item.place_name}</h5>
                    {item.road_address_name ? (
                        <div>
                        <span>{item.road_address_name}</span>
                        <span>{item.address_name}</span>
                        </div>
                    ) : (
                        <span>{item.address_name}</span>
                    )}
                    <span>{item.phone}</span>
                    </div>
                </div>
                ))}
                <div id="pagination"></div>
            </div>
        </div>
    </>
);
}
export default MapContainerWrapper;