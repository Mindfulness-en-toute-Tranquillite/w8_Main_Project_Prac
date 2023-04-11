import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export const Location4InfoWithServer = () => {
    //  지도 초기 위치 및 위도경도 state값
    const [center, setCenter] = useState({
        lat: 37.49676871972202,
        lng: 127.02474726969814,
    });
    const Index = () => {
        const [input1, setInput1] = useState("");
        const [input2, setInput2] = useState("");
        const [input3, setInput3] = useState("");
        const [input4, setInput4] = useState("");
        const [markers, setMarkers] = useState([]);
        // const [center, setCenter] = useState({ lat: 0, lng: 0 });
      
        const handleSearch = async () => {
          const keywords = [input1, input2, input3, input4];
          const markerCoords = [];
          for (const keyword of keywords) {
            const { x, y } = response.data.documents[0].address;
            markerCoords.push({ lat: Number(y), lng: Number(x) });
          }
          setMarkers(markerCoords);
          const midLat = (markerCoords[0].lat + markerCoords[1].lat + markerCoords[2].lat + markerCoords[3].lat) / 4;
          const midLng = (markerCoords[0].lng + markerCoords[1].lng + markerCoords[2].lng + markerCoords[3].lng) / 4;
          setCenter({ lat: midLat, lng: midLng });
      
          const requestData = {
            x1: markerCoords[0].lng,
            y1: markerCoords[0].lat,
            x2: markerCoords[1].lng,
            y2: markerCoords[1].lat,
            x3: markerCoords[2].lng,
            y3: markerCoords[2].lat,
            x4: markerCoords[3].lng,
            y4: markerCoords[3].lat,
          };
          const response = await axios.post(API_URL, requestData);
          console.log(response.data);
        };

    return (
    <div>
      <Map center={center} style={{ width: "100vw", height: "100vh" }}>
        {markers.map((marker, index) => (
          <MapMarker key={index} position={marker} />
        ))}
      </Map>
      <input
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        placeholder="Search place 1"
      />
      <input
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        placeholder="Search place 2"
      />
      <input
        value={input3}
        onChange={(e) => setInput3(e.target.value)}
        placeholder="Search place 3"
      />
      <input
        value={input4}
        onChange={(e) => setInput4(e.target.value)}
        placeholder="Search place 4"
        />
    </div>
    );
}
}
export default Location4InfoWithServer