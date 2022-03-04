import React, { useState, useEffect } from 'react'
import { lands } from './../constants/nftsDummy'
import NFTDisplay from '../components/MarketNftDetail/NftDisplay'
import Separator from '../components/Separator/Separator'
import ImageDisplay from './../components/ImageDisplay/ImageDisplay'
import NftDetails from '../components/MarketNftDetail/NftDetails'
import BackButton from '../components/Buttons/BackButton'
import NftProperties from '../components/MarketNftDetail/NftProperties'
import NftOffers from '../components/MarketNftDetail/NftOffers'
import RoleLabel from '../components/Label/RoleLabel'
import NftSaleCountDown from '../components/MarketNftDetail/NftSaleCountDown'
import ButtonSpinner from './../components/Buttons/ButtonSpinner'
import EthIcon from './../assets/svg/icons/EthIcon'

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
                    <div className="flex flex-row pr-20">
                        <div>
                            <div className="text-2xl text-blue-10">Houston</div>
                            <p className="text-base text-white">
                                Owned by{' '}
                                <strong className="text-primary">
                                    Pistachiogreen
                                </strong>
                            </p>
                        </div>
                        <div className="ml-auto flex flex-col justify-end">
                            <NftSaleCountDown />
                            <div className="ml-auto flex flex-row mt-4 gap-8">
                                <div className="flex-1 flex flex-row items-end gap-4">
                                    <div
                                        className="relative flex items-center"
                                        style={{ top: '-1px' }}
                                    >
                                        <EthIcon size="1.5em" />
                                    </div>
                                    <div className="text-white text-xl leading-none font-medium">
                                        0.5372
                                    </div>
                                </div>
                                <ButtonSpinner
                                    className="w-20 justify-center font-semibold"
                                    size="small"
                                >
                                    Sell
                                </ButtonSpinner>
                            </div>
                        </div>
                    </div>
                    <Separator title="Details" className="mt-4" />
                    <div className="mt-6 flex flex-row w-full pr-20">
                        <ImageDisplay img={detail?.locationImg} />
                        <div className="text-blue-9 text-base font-medium text-justify flex-1">
                            <p className=" break-words">
                                {detail?.description}
                            </p>
                        </div>
                    </div>
                    <NftProperties />
                    <NftOffers />
                </div>
            </div>
        </div>
    )
}

export default MarketNftDetailView
