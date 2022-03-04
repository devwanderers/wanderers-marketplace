import React from 'react'
import { cls } from './../../../services/helpers'
import NftOffersElement from './NftOffersElement'

const NftOfferContainer = ({ offers, className }) => {
    return (
        <div className={cls(`${className}`)}>
            <div className="pr-6" style={{ marginRight: '10px' }}>
                <div className="flex flex-row px-4">
                    <div className="flex-1 text-info">Price</div>
                    <div className="flex-1 text-info">USD Price</div>
                    <div className="flex-1 text-info">Expiration</div>
                    <div className="flex-1 text-info">From</div>
                </div>
            </div>
            <div className="mt-2 space-y-1 max-h-72 overflow-y-scroll scrollbar-g pr-6">
                <NftOffersElement />
                <NftOffersElement />
                <NftOffersElement />
                <NftOffersElement />
                <NftOffersElement />
                <NftOffersElement />
                <NftOffersElement />
            </div>
        </div>
    )
}

export default NftOfferContainer
