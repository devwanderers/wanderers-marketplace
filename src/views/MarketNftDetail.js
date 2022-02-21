/* eslint-disable no-unused-vars */
import React from 'react'
import { landsImages } from './../assets/images/lands/index'
import Tabs, { TabPane } from '../components/Tabs/Tabs'
import InfoNft from '../components/MarketNftDetail/InfoNft'
import TradeNft from './../components/MarketNftDetail/TradeNft'

const NFTDisplay = () => {
    return (
        <div className="flex justify-center py-4">
            <div className="">
                <div className="text-4xl text-white text-center mb-8 ">
                    Houston
                </div>
                <img src={landsImages.houston} alt={landsImages.houston} />
            </div>
        </div>
    )
}

const NFTSmallDisplay = () => {
    return (
        <div className="flex flex-row items-end">
            <div className="w-28 h-28 mr-4 bg-blue-8 rounded-md p-2">
                <img
                    className="w-full h-full"
                    src={landsImages.houston}
                    alt={landsImages.houston}
                />
            </div>
            <div className="text-4xl text-white">Houston</div>
        </div>
    )
}

const MarketNftDetail = (props) => {
    return (
        <div className="flex-1 flex flex-col xl:flex-row bg-blue-10">
            <div className="flex-1 ">
                <div className="w-full px-12">
                    <div className="mt-4 mb-10">
                        <NFTSmallDisplay />
                    </div>

                    <div>
                        <span className="flex flex-nowrap text-white h-14 items-center ">
                            <p className="  text-right min-w-min70 pl-6">
                                SELL ORDERS
                            </p>
                            <p className=" text-right pr-4 ml-auto min-w-min70">
                                SELL PRICE
                            </p>
                            <p className=" text-left min-w-min70 pr-6">TOKEN</p>
                        </span>
                        <div className="w-full text-white ">
                            <span className=" h-14 w-full mb-1 flex flex-row items-center cursor-pointer ">
                                <div className=" pl-6 w-full ml-auto text-left">
                                    <div className="flex items-center gap-0">
                                        0
                                    </div>
                                </div>
                                <div className="text-right pr-4 bg-red-50">
                                    952.97
                                </div>
                                <div className="text-left pr-6">USDC</div>
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <span className="flex flex-nowrap text-white h-14 items-center ">
                            <p className="  text-right min-w-min70 pl-6">
                                Buy ORDERS
                            </p>
                            <p className=" text-right pr-4 ml-auto min-w-min70">
                                Buy PRICE
                            </p>
                            <p className=" text-left min-w-min70 pr-24">
                                TOKEN
                            </p>
                        </span>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex ">
                <Tabs
                    className="flex-1 flex flex-col"
                    tabContainerClassName=" pl-3 px-4 lg:px-8 "
                    panelContainerClassName="py-2 flex-1 flex bg-blue-8"
                    disableBackground
                >
                    <TabPane
                        tab="Info"
                        className="flex-1 flex py-4  pl-4 lg:pxl-8  "
                    >
                        <InfoNft />
                    </TabPane>
                    <TabPane
                        tab="Trade"
                        className="flex-1 flex py-4 pl-3 pr-3 2xl:pl-8 2xl:pr-8"
                    >
                        <TradeNft />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default MarketNftDetail
