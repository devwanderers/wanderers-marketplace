import React from 'react'

import { RankFrameSVG } from '../assets/svg/frames'
import queen2 from '../assets/images/utilities/nfts/queen 2.png'
import Tabs, { TabPane } from '../components/Tabs/Tabs'
import CardNftMarket from './../components/Cards/CardNftMarket'
import { lands, roles } from './../constants/nftsDummy'

const Profile = () => {
    return (
        <div className="w-full bg-blue-4">
            <div className="flex flex-col lg:flex-row h-full">
                <div className="w-full lg:w-3/12 2xl:w-96  border-b-2 lg:border-r-2 border-blue-5 h-full pt-8 lg:pt-16 pb-4">
                    <div
                        className="w-full flex flex-col justify-center items-center "
                        // style={{ height: '450px' }}
                    >
                        <div className="w-80 lg:w-56 xl:w-72 2xl:w-20rem">
                            <div className="relative">
                                <div className="absolute left-0 right-0 -top-0 bottom-0 ">
                                    <div className="w-full h-full">
                                        <RankFrameSVG
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="h-80 lg:h-56 xl:h-72 2xl:h-20rem h w-full overflow-hidden"
                                    style={{ padding: '5.5%' }}
                                >
                                    <img
                                        src={queen2}
                                        alt={queen2}
                                        className="w-full h-full object-fill"
                                    />
                                </div>
                            </div>
                            <div className="w-full mt-1">
                                <div className="py-6 px-10 bg-blue-2">
                                    <div>
                                        <div className="font-russo-one font-semibold text-info">
                                            USER:
                                        </div>
                                        <div className="font-russo-one font-semibold text-info">
                                            ID:
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <Tabs
                        tabContainerClassName=" px-6 2xl:px-16"
                        panelContainerClassName="py-16 bg-blue-4 "
                    >
                        <TabPane tab="Lands" className="px-6 2xl:px-16">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4">
                                {lands.map((f) => {
                                    return (
                                        <div key={`${f.country}-${f.title}`}>
                                            <CardNftMarket
                                                id={f.id}
                                                nft={f.nft}
                                                title={f.title}
                                                isProfile
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </TabPane>
                        <TabPane tab="Ambassador" className="px-6 2xl:px-16">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4">
                                {roles.map((f) => {
                                    return (
                                        <div key={`${f.country}-${f.title}`}>
                                            <CardNftMarket
                                                id={f.id}
                                                nft={f.nft}
                                                title={f.title}
                                                isProfile
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Profile
