/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react'

import {
    FaArrowCircleLeft,
    FaArrowCircleRight,
    FaSpinner,
} from 'react-icons/fa'

import Tabs, { TabPane } from '../components/Tabs/Tabs'
import CardNftMarket from './../components/Cards/CardNftMarket'
import NftProfileDisplay from '../components/Profile/NftProfileDisplay'
import UserInfo from '../components/Profile/UserInfo'
import { useNftAvatarReducer } from '../store/reducers/nftAvatars/hooks'
import { useFetchNftLands } from './../store/reducers/nfts/hooks'

import ButtonMint from './../components/Profile/ButtonMint'
import {
    useSetAvatar,
    useSelectedAvatar,
} from './../store/reducers/profile/hook'
import { useWeb3React } from '@web3-react/core'
import { Navigate } from 'react-router-dom'
import MisteryBoxSection from '../components/MarketView/MisteryBoxSection'
import useNftWalletOfOwner from './../hooks/web3Hooks/useNftWalletOfOwner'
import {
    NFT_ADDRESS_GENESIS,
    LAND_ADDRESS,
} from './../constants/addressConstants'
import RefundModal from '../components/Modals/RefundModal'
import { useDispatch } from 'react-redux'
import { sendEmailRefund } from '../store/reducers/globalActions'
import useActiveWeb3React from './../hooks/useActiveWeb3React'
import requestedRefundsAddress from '../constants/requestedRefundsAddress'
import EmailSended from './../components/Modals/EmailSended'
import { Table } from 'antd'
import { useClaimRewards } from './../hooks/web3Hooks/useNFTs'
import ButtonSpinner from './../components/Buttons/ButtonSpinner'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const getAvatarName = (nft) => {
    return `${nft.tokenId}_${nft.address}`
}

const ButtonRefund = () => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleSended, setVisibleSended] = useState(false)
    const { account } = useActiveWeb3React()
    const tokensIdLand = useNftWalletOfOwner(NFT_ADDRESS_GENESIS)
    const tokensIdGenesis = useNftWalletOfOwner(LAND_ADDRESS)
    const dispatch = useDispatch()

    const sendEmail = useCallback(async () => {
        if (loading) return
        setLoading(true)
        try {
            await sleep(1000)
            await dispatch(sendEmailRefund(account)).unwrap()
            setVisibleSended((state) => !state)
            setVisible((state) => !state)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [loading, account, dispatch])

    return (
        <React.Fragment>
            <RefundModal
                loading={loading}
                visible={visible}
                tokensIdLand={tokensIdLand}
                tokensIdGenesis={tokensIdGenesis}
                onCancel={() => setVisible((state) => !state)}
                onConfirm={sendEmail}
            />
            <EmailSended
                visible={visibleSended}
                onCancel={() => setVisibleSended((state) => !state)}
            />
            <div className="text-center w-full">
                <span className="text-primary font-semibold text-xl">
                    Refund
                </span>
                <button
                    onClick={() => setVisible((state) => !state)}
                    className="bg-blue-6 rounded-md w-full  text-xl font-medium text-blue-5 disabled:opacity-40 mt-5"
                >
                    Refund NFTS
                </button>
            </div>
        </React.Fragment>
    )
}
const format = Intl.NumberFormat('en-US')

const convertToUSD = (someNumber) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(someNumber)
}

const TableDestinationsRewards = ({ lands }) => {
    const { fetch, data, isFetching } = useClaimRewards()
    const columns = [
        {
            title: 'Token Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Visitors',
            dataIndex: 'visitors',
            key: 'visitors',
        },
        {
            title: 'Rewards',
            dataIndex: 'rewards',
            key: 'rewards',
        },
    ]

    const dataSource = useMemo(() => {
        const dummys = [
            [2, 30],
            [3, 48.33],
            [4, 50],
            [20, 120],
            [50, 300],
        ]
        return lands.map(({ title, data: { tokenId, attributes } }, index) => {
            return {
                id: tokenId,
                country: attributes[0].value,
                destination: title,
                visitors: format.format(0),
                // visitors: format.format(!data ? dummys?.[index]?.[0] : 0),
                type: attributes[5].value ? 'Ambassador' : 'Destination',
                rewards: convertToUSD(0),
                // rewards: convertToUSD(!data ? dummys?.[index]?.[1] : 0),
            }
        })
    }, [lands, data])

    return (
        <div className="flex flex-col">
            <div className="ml-auto">
                <ButtonSpinner
                    loading={isFetching}
                    // onPointerDown={() => fetch()}
                    variant="info"
                    size="normal"
                    className="text-xl font-medium"
                    disabled={data}
                >
                    {' '}
                    Claim Rewards
                </ButtonSpinner>
            </div>
            <Table className="mt-6" columns={columns} dataSource={dataSource} />
        </div>
    )
}

const Profile = () => {
    const { account } = useWeb3React()
    if (!account) return <Navigate to={'/'} replace />

    const { fetch, nfts } = useNftAvatarReducer()
    const { index, avatar } = useSelectedAvatar()
    const { nfts: nftsLands, reload } = useFetchNftLands()

    const setAvatar = useSetAvatar()

    const handleNextAvatar = useCallback(() => {
        if (index === nfts.length - 1) setAvatar(getAvatarName(nfts[0]))
        if (index !== nfts.length - 1) setAvatar(getAvatarName(nfts[index + 1]))
    }, [nfts, index])

    const handlePreAvatar = useCallback(() => {
        if (index === 0) setAvatar(getAvatarName(nfts[nfts.length - 1]))
        if (index !== 0) setAvatar(getAvatarName(nfts[index - 1]))
    }, [nfts, index])

    const lands = useMemo(() => {
        if (nftsLands.length === 0) return []
        return nftsLands.map((land, index) => {
            return {
                id: land.tokenId,
                title:
                    land.attributes[0].value !== 'Unrevealed'
                        ? land.attributes[1].value
                        : land.attributes[0].value,
                nft: land.image,
                data: land,
            }
        })
    }, [nftsLands])

    const enableRefund = useMemo(() => {
        return requestedRefundsAddress.includes(account)
    }, [account])

    return (
        <div className="flex-1 flex bg-blue-7">
            {/* <Season2MintModal /> */}
            <div className="w-full max-w-1280px flex-1 mx-auto flex flex-row bg-blue-4">
                <div className="flex flex-col lg:flex-row h-full w-full">
                    <div className="w-full lg:w-3/12 2xl:w-96  border-b-2 lg:border-r-2 border-blue-5 h-full pt-8 lg:pt-16 pb-4">
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-80 lg:w-56 xl:w-72 2xl:w-20rem">
                                <NftProfileDisplay
                                    loading={!fetch}
                                    nftsLength={nfts?.length}
                                    image={avatar?.image}
                                />
                                <UserInfo
                                    className="mt-5"
                                    tokenId={avatar?.tokenId}
                                    nftDNA={avatar?.address}
                                    nftId={avatar?.name}
                                />

                                {nfts.length > 1 && (
                                    <div className="flex flex-row items-center justify-center h-full mt-5">
                                        <div className="flex-1 flex justify-center">
                                            <button
                                                disabled={
                                                    nfts.length === 0 ||
                                                    nfts.length === 1
                                                }
                                                onPointerDown={() =>
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
                                                onPointerDown={() =>
                                                    handleNextAvatar()
                                                }
                                                className="text-3xl disabled:opacity-70 transform active:scale-75"
                                            >
                                                <FaArrowCircleRight />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div className="w-full flex justify-center mt-4">
                                    <ButtonMint
                                        onMintEnd={() => {
                                            reload()
                                        }}
                                    />
                                </div>
                                {enableRefund && (
                                    <div className="w-full flex justify-center mt-4">
                                        <ButtonRefund />
                                    </div>
                                )}
                                {/* <div className="w-full flex justify-center mt-4">
                                    <ButtonSeasonTwoMint
                                        onMintEnd={() => {
                                            reload()
                                        }}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <Tabs
                            tabContainerClassName=" px-6 2xl:px-10"
                            panelContainerClassName="py-16 bg-blue-4 "
                        >
                            <TabPane
                                tab="Destinations"
                                className="px-6 2xl:px-10"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-4">
                                    <MisteryBoxSection />
                                    {lands.map((f) => {
                                        return (
                                            <div key={`${f.id}-${f.title}`}>
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
                            <TabPane tab="Rewards" className="px-6 2xl:px-10">
                                <TableDestinationsRewards lands={lands} />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
