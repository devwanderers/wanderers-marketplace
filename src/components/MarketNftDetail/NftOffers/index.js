import React from 'react'
import Separator from './../../Separator/Separator'
import NftOfferContainer from './NftOfferContainer'

const NftOffers = (props) => {
    return (
        <React.Fragment>
            <Separator title="Offers" className="mt-6 " />
            <NftOfferContainer className="mt-6 pr-20" />
        </React.Fragment>
    )
}

export default NftOffers
