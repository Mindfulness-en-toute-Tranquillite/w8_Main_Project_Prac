import { useRef } from "react"

const MyMap = () => {
  // 네이버 지도 API를 이용하여 지도 객체를 생성합니다.
  const mapRef = useRef(null);
  useEffect(() => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.5670135, 126.9783740),
      zoom: 13
    };
    const map = new naver.maps.Map(mapRef.current, mapOptions);
    // 지도를 생성하고 mapRef.current에 할당합니다.
  ),}
    //  마커 찍어 줄 state
    const [positions, setPositions] = useState([]);
    //  checkedPlace로 props값 받아오면 useEffect 실행하여 지도에 마커 찍히도록 gettingLocation 함수 실행.
    useEffect(() => {
      if(checkedPlace) {
        gettingLocation(checkedPlace)}
    },[checkedPlace])

    // 마커 생성 함수
    const createMarker = (map, position) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(position.latlng.lat, position.latlng.lng),
        map: map,
        icon: {
          content: `<div><img src="/marker.png" width="24" height="35" alt="${position.title}" /></div>`,
          anchor: new naver.maps.Point(12, 35)
        }
      });
      marker.setTitle(position.title);
    };

    // 새로운 마커 정보를 추가하는 함수
    const gettingLocation = function (newSearch) {
      const newMarker = {
        title: newSearch.place_name,
        latlng: { lat: newSearch.y, lng: newSearch.x },
      };
      setPositions(prevPositions => [...prevPositions, newMarker]);
    }

    // positions 배열에 저장된 마커 정보를 모두 지도에 표시합니다.
    useEffect(() => {
      positions.forEach(position => createMarker(map, position));
    }, [positions]);

    return (
      <div
        style={{ width: "100%", height: "400px" }}
        ref={mapRef}
      />
    );
};
}
export default MyMap;

export default MapController