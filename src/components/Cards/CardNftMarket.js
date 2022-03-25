/* eslint-disable no-unused-vars */
import React from 'react'
import { FrameTopSVG, FrameLandNameSVG } from '../../assets/svg/frames'
import useResponsive from '../../hooks/useResponsive'
import { limitStringLengthTo } from './../../services/stringServices'
import CardDown from './../../assets/svg/frames/CardDown'
import CardUp from './../../assets/svg/frames/CardUp'
import Banner from '../../assets/svg/frames/Banner'
import EthIcon from '../../assets/svg/icons/EthIcon'
import { useHistory } from 'react-router-dom'
import { MarketDetailPath } from '../../constants/routerConstants'

const CardNftMarket = ({ nft, title, id, isProfile }) => {
    const [topFrame] = useResponsive({ base: '-2%', lg: '-1%' })

    const history = useHistory()

    const handleClickNft = () => {
        history.push(`${MarketDetailPath}/${id}`)
    }
    return (
        <div className="w-full">
            <div className="w-full flex justify-center">
                <CardUp width="50%" />
            </div>
            <div className="w-full border-t border-b border-blue-6 relative">
                <div
                    onClick={handleClickNft}
                    className="relative cursor-pointer"
                >
                    <div className="w-full h-60 relative flex justify-center items-center overflow-hidden">
                        <img
                            src={nft}
                            alt={nft}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full flex justify-center my-3 relative">
                        <Banner width="80%" />
                        <div className="absolute inset-0 flex justify-center items-center">
                            <span className=" font-semibold text-lg lg:text-xl text-light-0">
                                {limitStringLengthTo(12, title)}
                            </span>
                        </div>
                    </div>
                    <div
                        className="w-full flex flex-row py-2 px-2 items-center"
                        style={{
                            backgroundImage:
                                'linear-gradient(to top, rgba(0,162,210,0.13), transparent)',
                        }}
                    >
                        <div className="flex flex-row items-center text-light-0">
                            <div
                                className="mr-1 relative "
                                style={{ top: '-1.5px' }}
                            >
                                <EthIcon />
                            </div>
                            <div className="">0.3</div>
                        </div>
                        <div className="ml-auto">
                            <button
                                onClick={handleClickNft}
                                className="bg-blue-6 rounded-md px-2 text-lg font-medium text-blue-5"
                            >
                                DETAIL
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute top-0 left-0 border-l border-blue-6"
                    style={{ height: '15%' }}
                ></div>
                <div
                    className="absolute top-0 right-0 border-r border-blue-6"
                    style={{ height: '15%' }}
                ></div>
            </div>
            <div className="w-full flex justify-center">
                <CardDown width="50%" />
            </div>
        </div>
    )
}

export default CardNftMarket
