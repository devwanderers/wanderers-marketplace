import React from 'react'
// import NftSaleCountDown from './../NftSaleCountDown'
import EthIcon from './../../../assets/svg/icons/EthIcon'
import ButtonSpinner from '../../Buttons/ButtonSpinner'
import windowOpen from './../../../services/windowOpen'

const NftHeader = ({ title, tokenId, ...props }) => {
    return (
        <div className="flex flex-row pr-5 lg:pr-20">
            <div>
                <div className="text-2xl text-blue-10">{title}</div>
                {/* <p className="text-base text-white">
                    Owned by{' '}
                    <strong className="text-primary">Pistachiogreen</strong>
                </p> */}
            </div>
            <div className="ml-auto flex flex-col justify-end">
                {/* <NftSaleCountDown /> */}
                <div className="ml-auto flex flex-col items-end md:items-start md:flex-row gap-2 lg:gap-8">
                    <div className="flex-1 flex flex-row items-center gap-1">
                        <div
                            className="relative flex items-center"
                            style={{ top: '-1px' }}
                        >
                            <EthIcon size="1.5em" />
                        </div>
                        <div className="text-white text-xl leading-none font-medium">
                            Monthly Reward
                        </div>
                    </div>{' '}
                    <div>
                        <ButtonSpinner
                            className="w-32 justify-center font-semibold mr-2"
                            size="small"
                            variant="secondary"
                            onClick={() =>
                                windowOpen(
                                    `https://opensea.io/assets/ethereum/0xac8167ab915cfa9bfafdee7f8d0ff6c198f9c230/${tokenId}`
                                )
                            }
                        >
                            View in OpenSea
                        </ButtonSpinner>
                        <ButtonSpinner
                            disabled
                            className="w-20 justify-center font-semibold"
                            size="small"
                        >
                            Claim
                        </ButtonSpinner>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NftHeader
