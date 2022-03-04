import React from 'react'
import Separator from './../../Separator/Separator'
import NftDetailElement from './NftDetailElement'

const NftDetails = (props) => {
    return (
        <React.Fragment>
            <Separator title="Details" className="mt-4" />
            <div className="mt-4 pr-5 space-y-1">
                <NftDetailElement
                    title="Contract Address"
                    value="0x3acc...5460"
                />
                <NftDetailElement title="Token ID" value="6203" />
                <NftDetailElement title="Token Standard" value="ERC-721" />
                <NftDetailElement title="Blockchain" value="Ethereum" />
            </div>
        </React.Fragment>
    )
}

export default NftDetails
