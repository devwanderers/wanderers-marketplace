import React from 'react'
import NFTDisplay from '../components/MarketNftDetail/NftDisplay'
import NftDetails from '../components/MarketNftDetail/NftDetails'
import BackButton from '../components/Buttons/BackButton'
import NftProperties from '../components/MarketNftDetail/NftProperties'
import RoleLabel from '../components/Label/RoleLabel'
import NftDetailsInfo from '../components/MarketNftDetail/NftDetailsInfo'
import NftHeader from '../components/MarketNftDetail/NftHeader'
import { useFetchNftLands, useNftDetail } from '../store/reducers/nfts/hooks'
import { useFetchPlaceSelected } from '../store/reducers/places/hooks'
import { Navigate, useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'

const MarketNftDetailView = (props) => {
    const { id } = useParams()
    const { account } = useWeb3React()

    useFetchNftLands()
    const detail = useNftDetail(id)
    const placeInfo = useFetchPlaceSelected(
        detail?.attributes[1]?.value,
        detail?.attributes[0]?.value
    )

    if (!id || !account) return <Navigate to={'/'} replace />

    return (
        <div className="flex-1 flex bg-blue-7">
            <div className="max-w-1280px flex-1 mx-auto flex flex-col lg:flex-row bg-blue-4">
                <div className="w-full lg:w-1/3 pl-5 xl:pl-16 border-r border-aqua-3 pt-6">
                    <div className="flex flex-row justify-between items-center pr-5">
                        <BackButton />
                        <RoleLabel title={'Destination'} />
                    </div>
                    <div
                        className="mt-8 pl-4 pr-12 mb-12 mx-auto"
                        style={{ maxWidth: '400px' }}
                    >
                        <NFTDisplay {...detail} />
                    </div>
                    <NftDetails {...detail} />
                </div>
                <div className="flex-1 pt-6 pl-4 pb-20 lg:pb-0">
                    <NftHeader tokenId={id} title={placeInfo?.place} />
                    {detail && detail.attributes[0]?.value !== 'Unrevealed' && (
                        <NftDetailsInfo detail={placeInfo} />
                    )}
                    <NftProperties attributes={detail?.attributes} />
                </div>
            </div>
        </div>
    )
}

export default MarketNftDetailView
