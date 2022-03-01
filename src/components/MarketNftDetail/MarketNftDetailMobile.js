/* eslint-disable no-unused-vars */
import React from 'react'
import Tabs, { TabPane } from '../Tabs/Tabs'
import InfoNft from './InfoNft'
import TradeNft from './TradeNft'
import OrdersBook from './OrdersBook'
import NFTSmallDisplay from './NFTSmallDisplay'

const MarketNftDetailMobile = () => {
    return (
        <div className="flex-1 flex flex-col xl:flex-row bg-blue-10">
            <div className="flex-1 pb-16">
                <div className="w-full px-12">
                    <div className="mt-4 mb-10">
                        <NFTSmallDisplay />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex ">
                <Tabs
                    className="flex-1 flex flex-col"
                    tabContainerClassName=" pl-3 px-4 lg:px-8 "
                    panelContainerClassName="py-2 flex-1 flex bg-blue-8"
                >
                    <TabPane
                        tab="Info"
                        className="flex-1 flex py-4  pl-4 lg:pxl-8"
                    >
                        <InfoNft />
                    </TabPane>
                    <TabPane
                        tab="Trade"
                        className="flex-1 flex flex-col py-4 pl-3 pr-3 2xl:pl-8 2xl:pr-8"
                    >
                        <TradeNft />
                        <div>
                            <div>
                                <OrdersBook orderTitle="SELL" />
                            </div>
                            <div className="">
                                <OrdersBook orderTitle="BUY" />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default MarketNftDetailMobile
