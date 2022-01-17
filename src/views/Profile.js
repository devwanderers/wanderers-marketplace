import React from 'react'

import { landsImages } from './../assets/images/lands/index'
import { RankFrameSVG } from '../assets/svg/frames'
import nft256 from '../assets/images/utilities/nfts/256.png'
import CardNft from '../components/Cards/CardNft'

const lands = [
    {
        id: 'VG',
        city: 'Las Vegas',
        country: 'USA',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.arai01,
    },
    {
        id: 'LA',
        city: 'Los Angeles',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'USA',
        image: landsImages.cebu01,
    },
    {
        id: 'LA',
        city: 'North Las Vegas',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'USA',
        image: landsImages.drottningholmv01,
    },
    {
        id: 'jacksonVille',
        city: 'Jackson Ville',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Mexico',
        image: landsImages.gotland01,
    },
    {
        id: 'EL',
        city: 'Elko',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Mexico',
        image: landsImages.mapTest,
    },
    {
        id: 'CA',
        city: 'Carson',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Brasil',
        image: landsImages.carson,
    },
    {
        id: 'austin',
        city: 'Austing',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Brasil',
        image: landsImages.austin,
    },
    {
        id: 'maiami',
        city: 'Miami',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Brasil',
        image: landsImages.miami,
    },
]

const Profile = () => {
    return (
        <div className="w-full bg-blue-10">
            <div className="flex flex-col lg:flex-row h-full">
                <div className="w-full lg:w-3/12 border-b-2 lg:border-r-2 border-blue-11 h-full pt-8 lg:pt-16 pb-4">
                    <div
                        className="w-full flex flex-col justify-center items-center "
                        // style={{ height: '450px' }}
                    >
                        <div className="w-80 lg:w-56 xl:w-80 2xl:w-96">
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
                                    className="h-80 lg:h-56 xl:h-80 2xl:h-96 w-full overflow-hidden"
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
                    <div className="bg-blue-7">
                        <div className="flex flex-row text-2xl justify-center md:justify-start font-saira-condensed pl-5 space-x-5 border-b-2 border-blue-11">
                            <a className="px-3 pb-2 border-b-4  border-green-0">
                                <div className="pt-4 text-white"> Lands</div>
                            </a>
                            <a className="px-3 pb-2">
                                <div className="pt-4 text-blue-4"> Ships</div>
                            </a>
                            <a className="px-3 pb-2">
                                <div className="pt-4 text-blue-4">
                                    Monuments
                                </div>
                            </a>
                        </div>
                    </div>{' '}
                    <div
                        className="bg-blue-10 relative"
                        // style={{ maxWidth: '1200px' }}
                    >
                        <div className="absolute inset-0 background-pattern-polka"></div>
                        <div className="relative w-full px-6 xl:pl-5 2xl:pr-12 pt-8 2xl:pt-12 pb-16 ">
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                                {lands.map((f) => {
                                    return (
                                        <div key={`${f.country}-${f.city}`}>
                                            <CardNft
                                                image={f.image}
                                                city={f.city}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
