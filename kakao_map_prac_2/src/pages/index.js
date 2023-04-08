import GetInfo3Person from '@/features/GetInfo3Person'
import KeywordMapSearch from '@/features/KeywordMapSearch'
import MarkersOnMap from '@/features/MarkersOnMap'
import ModifiedByChatGPT from '@/features/ModifiedByChatGPT'
import { SearchingTwoOnMap } from '@/features/SearchingTwoOnMap'
import React from 'react'

function index() {
    return (
    <div>
        {/* <MarkersOnMap></MarkersOnMap>
        <KeywordMapSearch/> */}
        {/* <SearchingTwoOnMap></SearchingTwoOnMap> */}
        {/* <ModifiedByChatGPT /> */}
        <GetInfo3Person></GetInfo3Person>
    </div>
    )
}

export default index