import React, { useState, useEffect } from 'react'
import { lands } from './../constants/nftsDummy'
import NFTDisplay from '../components/MarketNftDetail/NftDisplay'
import NftDetails from '../components/MarketNftDetail/NftDetails'
import BackButton from '../components/Buttons/BackButton'
import NftProperties from '../components/MarketNftDetail/NftProperties'
import NftOffers from '../components/MarketNftDetail/NftOffers'
import RoleLabel from '../components/Label/RoleLabel'
import NftDetailsInfo from '../components/MarketNftDetail/NftDetailsInfo'
import NftHeader from '../components/MarketNftDetail/NftHeader'

const MarketNftDetailView = (props) => {
    const [detail, setDetail] = useState(null)
    const { match } = props
    const id = match?.params?.id

    if (!id) console.log('No data')

    useEffect(() => {
        const _id = lands.findIndex((l) => l.id === id)
        if (id !== -1) setDetail(lands[_id])
    }, [id])

    return (
        <div className="flex-1 flex bg-blue-7">
            <div className="max-w-1280px flex-1 mx-auto flex flex-row bg-blue-4">
                <div className="w-1/3 pl-16 border-r border-aqua-3 pt-6">
                    <div className="flex flex-row justify-between items-center pr-5">
                        <BackButton />
                        <RoleLabel title={'Destination'} />
                    </div>
                    <div className="mt-8 pl-4 pr-12 mb-12">
                        <NFTDisplay {...detail} />
                    </div>
                    <NftDetails />
                </div>
                <div className="flex-1 pt-6 pl-4">
                    <NftHeader />
                    <NftDetailsInfo detail={detail} />
                    <NftProperties />
                    <NftOffers />
                </div>
            </div>
        </div>
    )
}

export default MarketNftDetailView
