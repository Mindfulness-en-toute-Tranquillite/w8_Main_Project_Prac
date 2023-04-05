import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('react-kakao-maps'), {
  ssr: false,
});

function MapTest() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBILC_KAKAOMAP_KEY}&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 3,
        };
        const map = new kakao.maps.Map(document.getElementById('map'), options);
      });
    };
  }, []);

  return (
    <div>
      <h1>My Next.js App</h1>
      <Map id="map" style={{ width: '100%', height: '400px' }} />
    </div>
  );
}

export default MapTest;