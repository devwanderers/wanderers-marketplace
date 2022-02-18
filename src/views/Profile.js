import React from 'react'

import { landColors } from './../assets/images/lands/colors'
import { RankFrameSVG } from '../assets/svg/frames'
import nft256 from '../assets/images/utilities/nfts/256.png'
import CardNft from '../components/Cards/CardNft'
import { rolesImg } from './../assets/images/roles/index'
import Tabs, { TabPane } from '../components/Tabs/Tabs'

const lands = [
    {
        id: 'VG',
        title: 'Las Vegas',
        country: 'USA',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landColors.redLand,
    },
    {
        id: 'LA',
        title: 'Los Angeles',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'USA',
        image: landColors.greenLand,
    },
    {
        id: 'LA',
        title: 'North Las Vegas',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'USA',
        image: landColors.yellowLand,
    },
    {
        id: 'jacksonVille',
        title: 'Jackson Ville',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Mexico',
        image: landColors.greenLand,
    },
    {
        id: 'EL',
        title: 'Elko',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Mexico',
        image: landColors.purpleLand,
    },
    {
        id: 'CA',
        title: 'Carson',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Brasil',
        image: landColors.orangeLand,
    },
    {
        id: 'austin',
        title: 'Austing',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Brasil',
        image: landColors.redLand,
    },
    {
        id: 'maiami',
        title: 'Miami',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Brasil',
        image: landColors.greenLand,
    },
]

const roles = [
    {
        id: 'BRC',
        title: 'Bronce',
        image: rolesImg.bronce,
    },
    {
        id: 'SLV',
        title: 'Silver',
        image: rolesImg.silver,
    },
    {
        id: 'GLD',
        title: 'GOLD',
        image: rolesImg.gold,
    },
]

const Profile = () => {
    return (
        <div className="w-full bg-blue-10">
            <div className="flex flex-col lg:flex-row h-full">
                <div className="w-full lg:w-3/12 2xl:w-96  border-b-2 lg:border-r-2 border-blue-11 h-full pt-8 lg:pt-16 pb-4">
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
                                        src={nft256}
                                        alt={nft256}
                                        className="w-full h-full object-fill"
                                    />
                                </div>
                            </div>
                            <div className="w-full mt-1">
                                <div className="py-6 px-10 bg-blue-7">
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
                        panelContainerClassName="py-16"
                    >
                        <TabPane tab="Lands" className="px-6 2xl:px-16">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4">
                                {lands.map((f) => {
                                    return (
                                        <div key={`${f.country}-${f.title}`}>
                                            <CardNft
                                                image={f.image}
                                                title={f.title}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </TabPane>
                        <TabPane tab="Roles">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4">
                                {roles.map((f) => {
                                    return (
                                        <div key={`${f.country}-${f.title}`}>
                                            <CardNft
                                                image={f.image}
                                                title={f.title}
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
