/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FrameTopSVG, FrameLandNameSVG } from '../../assets/svg/frames'
import useResponsive from '../../hooks/useResponsive'
import { limitStringLengthTo } from '../../services/text'
import CardDown from '../../assets/svg/frames/CardDown'
import CardUp from '../../assets/svg/frames/CardUp'
import Banner from '../../assets/svg/frames/Banner'
import EthIcon from '../../assets/svg/icons/EthIcon'
import { MarketDetailPath } from '../../constants/routerConstants'
import ButtonSpinner from '../Buttons/ButtonSpinner'
import { FaSpinner } from 'react-icons/fa'
import { cls } from './../../services/helpers'

const CardRewardTrip = ({
    image,
    title,
    id,
    loading,
    onClickTerm,
    onReveal,
    hideReveal,
    hideTerms,
    disableReveal,
}) => {
    const [topFrame] = useResponsive({ base: '-2%', lg: '-1%' })

    const navigate = useNavigate()

    return (
        <div className="w-full">
            <div className="w-full flex justify-center">
                <CardUp width="50%" />
            </div>
            <div className="w-full border-t border-b border-blue-6 relative">
                <div onClick={onClickTerm} className="relative cursor-pointer">
                    <div className="w-full h-60 relative flex justify-center items-center overflow-hidden">
                        {image && (
                            <img
                                src={image}
                                alt={image}
                                className="w-full h-full object-cover"
                            />
                        )}
                        {loading && (
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white bg-gray-800 bg-opacity-50">
                                <FaSpinner
                                    className={'animate-spin text-4xl'}
                                />
                            </div>
                        )}
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
                        <div
                            className={cls(
                                `w-full flex ${
                                    !hideReveal && !hideTerms
                                        ? 'justify-between'
                                        : 'justify-center'
                                }`
                            )}
                        >
                            {!hideReveal && (
                                <button
                                    disabled={loading || disableReveal}
                                    onClick={onReveal}
                                    className="bg-blue-6 disabled:opacity-50 rounded-md px-2 text-lg font-medium text-blue-5"
                                >
                                    Reveal
                                </button>
                            )}
                            {!hideTerms && (
                                <button
                                    disabled={loading}
                                    onClick={onClickTerm}
                                    className="bg-blue-6 disabled:opacity-50 rounded-md px-2 text-lg font-medium text-blue-5"
                                >
                                    Terms & Cond
                                </button>
                            )}
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

export default CardRewardTrip
