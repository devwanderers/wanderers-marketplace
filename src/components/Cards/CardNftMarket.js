import React from 'react'
import { FrameTopSVG, FrameLandNameSVG } from '../../assets/svg/frames'
import useResponsive from '../../hooks/useResponsive'
import { limitStringLengthTo } from './../../services/stringServices'

const CardNftMarket = ({ image, title }) => {
    const [topFrame] = useResponsive({ base: '-2%', lg: '-1%' })

    return (
        <div className="rounded-lg bg-blue-7">
            <div className="relative w-full border border-green-4 rounded-t-md cursor-pointer">
                <div
                    className="absolute left-0 right-0 w-20 m-auto"
                    style={{ top: topFrame }}
                >
                    <FrameTopSVG />
                </div>
                {/* <div
                    className="absolute left-0 right-0 w-28 m-auto"
                    style={{
                        bottom: bottomFrame,
                    }}
                >
                    <FrameBottomSVG />
                </div> */}
                <div className="relative overflow-hidden py-2 lg:py-4">
                    <div className="w-36 lg:w-56 mx-auto pb-1">
                        <img
                            src={image}
                            alt={image}
                            className="w-full h-auto"
                        />
                    </div>
                    <div
                        className=""
                        style={{
                            paddingLeft: '8%',
                            paddingRight: '8%',
                        }}
                    >
                        <div className="w-full relative">
                            <FrameLandNameSVG width={'100%'} />
                            <div className="absolute inset-0 flex justify-center items-center">
                                <span className=" font-semibold text-xl lg:text-3xl text-white">
                                    {limitStringLengthTo(12, title)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full text-center py-3 bg-green-4 rounded-b-md hover:bg-aqua-1 cursor-pointer">
                <span className="text-xl  font-russo-one text-white">
                    TRADE
                </span>
            </div>
        </div>
    )
}

export default CardNftMarket
