import React from 'react'
import NftSaleCountDown from './../NftSaleCountDown'
import EthIcon from './../../../assets/svg/icons/EthIcon'
import BuyButton from '../SellButton'

const NftHeader = ({ ...props }) => {
    return (
        <div className="flex flex-row pr-20">
            <div>
                <div className="text-2xl text-blue-10">Houston</div>
                <p className="text-base text-white">
                    Owned by
                    <strong className="text-primary">Pistachiogreen</strong>
                </p>
            </div>
            <div className="ml-auto flex flex-col justify-end">
                <NftSaleCountDown />
                <div className="ml-auto flex flex-row mt-4 gap-8">
                    <div className="flex-1 flex flex-row items-center gap-1">
                        <div
                            className="relative flex items-center"
                            style={{ top: '-1px' }}
                        >
                            <EthIcon size="1.5em" />
                        </div>
                        <div className="text-white text-xl leading-none font-medium">
                            0.3
                        </div>
                    </div>
                    <BuyButton />
                </div>
            </div>
        </div>
    )
}

export default NftHeader
