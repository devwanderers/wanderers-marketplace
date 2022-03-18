import React from 'react'

import queen2 from '../assets/images/utilities/nfts/queen 2.png'
import Tabs, { TabPane } from '../components/Tabs/Tabs'
import CardNftMarket from './../components/Cards/CardNftMarket'
import { lands, roles } from './../constants/nftsDummy'
import NftProfileDisplay from '../components/Profile/NftProfileDisplay'
import UserInfo from '../components/Profile/UserInfo'

const Profile = () => {
    return (
        <div className="flex-1 flex bg-blue-7">
            <div className="max-w-1280px flex-1 mx-auto flex flex-row bg-blue-4">
                <div className="flex flex-col lg:flex-row h-full">
                    <div className="w-full lg:w-3/12 2xl:w-96  border-b-2 lg:border-r-2 border-blue-5 h-full pt-8 lg:pt-16 pb-4">
                        <div
                            className="w-full flex flex-col justify-center items-center "
                            // style={{ height: '450px' }}
                        >
                            <div className="w-80 lg:w-56 xl:w-72 2xl:w-20rem">
                                <NftProfileDisplay image={queen2} />
                                <UserInfo className="mt-5" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Tabs
                            tabContainerClassName=" px-6 2xl:px-10"
                            panelContainerClassName="py-16 bg-blue-4 "
                        >
                            <TabPane tab="Lands" className="px-6 2xl:px-10">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-4">
                                    {lands.map((f) => {
                                        return (
                                            <div
                                                key={`${f.country}-${f.title}`}
                                            >
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
                            <TabPane
                                tab="Ambassador"
                                className="px-6 2xl:px-16"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4">
                                    {roles.map((f) => {
                                        return (
                                            <div
                                                key={`${f.country}-${f.title}`}
                                            >
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
        </div>
    )
}

export default Profile
