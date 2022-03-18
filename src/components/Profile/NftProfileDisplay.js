import React from 'react'
import { RankFrameSVG } from '../../assets/svg/frames'

const NftProfileDisplay = ({ image }) => {
    return (
        <div className="relative">
            <div className="absolute left-0 right-0 -top-0 bottom-0 ">
                <div className="w-full h-full">
                    <RankFrameSVG width={'100%'} height={'100%'} />
                </div>
            </div>
            <div
                className="h-80 lg:h-56 xl:h-72 2xl:h-20rem h w-full overflow-hidden"
                style={{ padding: '5.5%' }}
            >
                <img
                    src={image}
                    alt={image}
                    className="w-full h-full object-fill"
                />
            </div>
        </div>
    )
}

export default NftProfileDisplay
