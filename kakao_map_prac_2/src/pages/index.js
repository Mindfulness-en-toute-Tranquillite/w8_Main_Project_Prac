import GetInfo3Person from '@/features/GetInfo3Person'
import KeywordMapSearch from '@/features/KeywordMapSearch'
import Location4InfoWithServer from '@/features/Location4InfoWithServer'
import MarkersOnMap from '@/features/MarkersOnMap'
import ModifiedByChatGPT from '@/features/ModifiedByChatGPT'
import { SearchingTwoOnMap } from '@/features/SearchingTwoOnMap'
import Try1 from '@/features/Try1'
import Try2 from '@/features/try2'
import React from 'react'
import { getKakaoAddress } from '@/features/KakaoAdressAPI'
import AddressSearch from '@/features/AddressSearch'
import AddressSearchFeatures from '@/features/\bAdressSearchFeatures'
import Sample5 from '@/features/searchAdressWithMap'
import MapPage from '@/features2/AdressOnMap'
import SearchPlace from '@/mapKeyword/SearchPlace'
import MapContainer from '@/mapKeyword/MapContainer'

function index() {
    return (
    <div>
        {/* <MarkersOnMap></MarkersOnMap> */}
        <KeywordMapSearch/>
        {/* <SearchingTwoOnMap></SearchingTwoOnMap> */}
        {/* <ModifiedByChatGPT /> */}
        {/* <GetInfo3Person></GetInfo3Person> */}
        {/* <Location4InfoWithServer/> */}
        {/* <Try1></Try1> */}
        {/* <Try2 /> */}
        {/* <getKakaoAddress></getKakaoAddress> */}
        {/* <AddressSearchFeatures></AddressSearchFeatures> */}
        {/* <Sample5/> */}
        {/* <MapPage></MapPage> */}
        {/* <SearchPlace/> */}
        {/* <MapContainer/> */}
    </div>
    )
}

export default index