import React from 'react'
import { FrameTopSVG, FrameBottomSVG } from '../../assets/svg/frames'
import useResponsive from './../../hooks/useResponsive'

export const CardNft = ({ image, city }) => {
    const [topFrame] = useResponsive({ base: '-2.6%' })
    const [bottomFrame] = useResponsive({ base: '-3.5%', xxl: '-2.5%' })

    return (
        <div className="rounded-lg bg-blue-7">
            <div className="relative w-full border border-green-4 rounded-t-md cursor-pointer">
                <div
                    className="absolute left-0 right-0 w-20 m-auto"
                    style={{ top: topFrame }}
                >
                    <FrameTopSVG />
                </div>
                <div
                    className="absolute left-0 right-0 w-28 m-auto"
                    style={{
                        bottom: bottomFrame,
                    }}
                >
                    <FrameBottomSVG />
                </div>
                <div className="h-40 w-40 2xl:h-48 2xl:w-48 m-auto p-2">
                    <img
                        src={image}
                        alt={image}
                        className="w-auto h-full m-auto object-cover"
                    />
                </div>
            </div>
            <div className="px-2 lg:px-4 pt-5 pb-4 border border-t-0 border-green-4 rounded-b-md cursor-pointer">
                <div className="text-left text-base md:text-lg lg:text-base 2xl:text-xl text-info font-russo-one">
                    {city}
                </div>
            </div>
        </div>
    )
}

export default CardNft
