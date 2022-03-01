/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Tabs, { TabPane } from '../Tabs/Tabs'
import InfoNft from './InfoNft'
import TradeNft from './TradeNft'
import OrdersBook from './OrdersBook'
import NFTSmallDisplay from './NFTSmallDisplay'
import NFTDisplay from './NftDisplay'
import { useLocation } from 'react-router-dom'
import { lands } from './../../constants/nftsDummy'

const MarketNftDetail = ({ data }) => {
    return (
        <div className="flex-1 flex xl:flex-row bg-blue-14">
            <div className="max-w-1280px mx-auto flex bg-blue-10 w-full">
                <div
                    className="flex-1 w-full fancyScrollbar overflow-y-auto pb-16"
                    style={{ height: '100%' }}
                >
                    <div className="w-full px-12">
                        <NFTDisplay {...data} />
                        {/* <div className="mt-4 mb-10">
                        <NFTSmallDisplay />
                    </div>
                    <div>
                        <OrdersBook orderTitle="SELL" />
                    </div>
                    <div className="">
                        <OrdersBook orderTitle="BUY" />
                    </div> */}
                    </div>
                </div>
                <div className="flex-1 flex">
                    <Tabs
                        className="flex-1 flex flex-col"
                        tabContainerClassName="pl-3 px-4 lg:px-8"
                        panelContainerClassName="py-2 flex-1 flex"
                    >
                        <TabPane
                            tab="Info"
                            className="flex-1 flex py-4  pl-4 lg:pxl-8"
                        >
                            <InfoNft {...data} />
                        </TabPane>
                        <TabPane
                            tab="Trade"
                            className="flex-1 flex py-4 pl-3 pr-3 2xl:pl-8 2xl:pr-8"
                        >
                            <TradeNft {...data} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default MarketNftDetail
