/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import MarketNftDetailMobile from '../components/MarketNftDetail/MarketNftDetailMobile'
import MarketNftDetail from './../components/MarketNftDetail/MarketNftDetail'
import useWindowSize from './../hooks/useWindowSize'
import { lands } from './../constants/nftsDummy'

const MarketNftDetailView = (props) => {
    const { width } = useWindowSize()
    const [detail, setDetail] = useState(null)
    const { match } = props
    const id = match?.params?.id

    if (!id) console.log('No data')

    useEffect(() => {
        const _id = lands.findIndex((l) => l.id === id)
        if (id !== -1) setDetail(lands[_id])
    }, [id])
    return width > 1024 ? (
        <MarketNftDetail data={detail} {...props} />
    ) : (
        <MarketNftDetailMobile data={detail} {...props} />
    )
}

export default MarketNftDetailView
