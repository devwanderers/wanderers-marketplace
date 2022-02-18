/* eslint-disable no-unused-vars */
import React from 'react'
import { landsImages } from './../assets/images/lands/index'
import Tabs, { TabPane } from '../components/Tabs/Tabs'
import InfoNft from '../components/MarketNftDetail/InfoNft'
import TradeNft from './../components/MarketNftDetail/TradeNft'

const MarketNftDetail = (props) => {
    return (
        <div className="flex-1 flex bg-blue-10">
            <div className="flex-1 ">
                <div className="flex justify-center py-4">
                    <div>
                        <div></div>
                        <img
                            src={landsImages.houston}
                            alt={landsImages.houston}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex ">
                <Tabs
                    className="flex-1 flex flex-col"
                    tabContainerClassName=" pl-3 pr-3 2xl:pl-8 2xl:pr-8"
                    panelContainerClassName="py-2 flex-1 flex"
                    disableBackground
                >
                    <TabPane
                        tab="Info"
                        className="flex-1 flex py-4 pl-3 2xl:pl-8 "
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
