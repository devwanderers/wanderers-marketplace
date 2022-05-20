import React from 'react'
import ElementContainer from '../../Container/ElementContainer'
import EthIcon from './../../../assets/svg/icons/EthIcon'
import { formatAddress } from './../../../services/address'

const NftOfferElement = (props) => {
    return (
        <ElementContainer
            variant="secondary"
            className="flex flex-row items-end text-white px-4"
        >
            <div className="flex-1 flex flex-row gap-4">
                <div className="relative " style={{ top: '1px' }}>
                    <EthIcon size="1.2em" />
                </div>
                <div>0.5372</div>
            </div>
            <div className="flex-1">$1556,16</div>
            <div className="flex-1">34 min</div>
            <div className="flex-1">
                {formatAddress('0xadf3423nqdsf0sf2axasdx')}
            </div>
        </ElementContainer>
    )
}

export default NftOfferElement
