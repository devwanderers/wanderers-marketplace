import React from 'react'
import Separator from './../../Separator/Separator'
import NftDetailElement from './NftDetailElement'
import { formatAddress } from './../../../services/address'

const NftDetails = ({ name, edition, tokenId }) => {
    return (
        <React.Fragment>
            <Separator title="Details" className="mt-4" />
            <div className="mt-4 pr-5 space-y-1">
                <NftDetailElement title="Token Name" value={name} />
                <NftDetailElement
                    title="Contract Address"
                    value={formatAddress(
                        process.env.REACT_APP_LAND_DESTINARE_CONTRACT_ADDRESS
                    )}
                />
                <NftDetailElement title="Token ID" value={tokenId} />
                <NftDetailElement title="Token Standard" value="ERC-721" />
                <NftDetailElement title="Blockchain" value="Ethereum" />
            </div>
        </React.Fragment>
    )
}

export default NftDetails
