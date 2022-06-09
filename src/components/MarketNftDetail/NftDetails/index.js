import React from 'react'
import Separator from './../../Separator/Separator'
import NftDetailElement from './NftDetailElement'
import { formatAddress } from './../../../services/address'
import { LAND_ADDRESS } from '../../../constants/addressConstants'

const NftDetails = ({ name, edition, tokenId, attributes = [] }) => {
    const isAmbassador = Boolean(attributes[5].trait_type === 'Ambassador')

    return (
        <React.Fragment>
            <Separator title="Details" className="mt-4" />
            <div className="mt-4 pr-5 space-y-1">
                <NftDetailElement title="Token Name" value={name} />
                <NftDetailElement
                    title="Contract Address"
                    value={formatAddress(LAND_ADDRESS)}
                />
                <NftDetailElement title="Token ID" value={tokenId} />
                <NftDetailElement title="Token Standard" value="ERC-721" />
                <NftDetailElement title="Blockchain" value="Ethereum" />
                {isAmbassador && <NftDetailElement title="Ambassador" />}
            </div>
        </React.Fragment>
    )
}

export default NftDetails
