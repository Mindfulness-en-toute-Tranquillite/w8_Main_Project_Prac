//    처음 랜더링시 지도 불러오기ㅎ
  useEffect(() => {
    mapCreate()
  },[])
    //  지도
    const mapCreate =() => {
      const { kakao } = window;
      const map = new kakao.maps.Map(document.getElementById('map'), 
      {
          center: new kakao.maps.LatLng(center),
          level: 4
      });
    }