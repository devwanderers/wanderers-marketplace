/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'

import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import Tabs, { TabPane } from '../components/Tabs/Tabs'
import CardNftMarket from './../components/Cards/CardNftMarket'
// import { lands } from './../constants/nftsDummy'
import NftProfileDisplay from '../components/Profile/NftProfileDisplay'
import UserInfo from '../components/Profile/UserInfo'
import {
    useFetchNftAvatars,
    useNftAvatarReducer,
} from '../store/reducers/nftAvatars/hooks'
import {
    useFetchNftLands,
    useNftsReducer,
} from './../store/reducers/nfts/hooks'
import {
    useSetAvatar,
    useFetchProfile,
    useSelectedAvatar,
} from './../store/reducers/profile/hook'

const Profile = () => {
    useFetchNftAvatars()
    useFetchProfile()

    const nftsLands = useFetchNftLands()

    const { fetch, nfts } = useNftAvatarReducer()
    const { index, avatar } = useSelectedAvatar()
    const { fetch: fetchLands, nfts: nftLands } = useNftsReducer()
    const setAvatar = useSetAvatar()
    const [lands, setLands] = useState([])

    const handleNextAvatar = useCallback(() => {
        if (index === nfts.length - 1) setAvatar(nfts[0].edition.toString())
        if (index !== nfts.length - 1)
            setAvatar(nfts[index + 1].edition.toString())
    }, [nfts, index])

    const handlePreAvatar = useCallback(() => {
        if (index === 0) setAvatar(nfts[nfts.length - 1].edition.toString())
        if (index !== 0) setAvatar(nfts[index - 1].edition.toString())
    }, [nfts, index])

    useEffect(() => {
        if (nftsLands.length > 0) {
            const l = nftsLands.reduce((acc, n) => {
                const place = n.attributes[0].value

                return [
                    ...acc,
                    {
                        id: place,
                        title: place,
                        nft: n.image,
                    },
                ]
            }, [])
            setLands(l)
        }
    }, [nftsLands])

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
                                <NftProfileDisplay
                                    loading={!fetch}
                                    nftsLength={nfts?.length}
                                    image={avatar?.image}
                                />
                                {avatar?.dna && (
                                    <UserInfo
                                        className="mt-5"
                                        nftDNA={avatar?.dna}
                                        nftId={avatar?.name}
                                    />
                                )}
                                {nfts.length > 1 && (
                                    <div className="flex flex-row items-center justify-center h-full mt-5">
                                        <div className="flex-1 flex justify-center">
                                            <button
                                                disabled={
                                                    nfts.length === 0 ||
                                                    nfts.length === 1
                                                }
                                                onClick={() =>
                                                    handlePreAvatar()
                                                }
                                                className="text-3xl text-primary disabled:opacity-70 transform active:scale-75"
                                            >
                                                <FaArrowCircleLeft />
                                            </button>
                                        </div>
                                        <div className="flex-1 flex justify-center text-primary">
                                            <button
                                                disabled={
                                                    nfts.length === 0 ||
                                                    nfts.length === 1
                                                }
                                                onClick={() =>
                                                    handleNextAvatar()
                                                }
                                                className="text-3xl disabled:opacity-70 transform active:scale-75"
                                            >
                                                <FaArrowCircleRight />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Tabs
                            tabContainerClassName=" px-6 2xl:px-10"
                            panelContainerClassName="py-16 bg-blue-4 "
                        >
                            <TabPane
                                tab="Destinations"
                                className="px-6 2xl:px-10"
                            >
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
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
