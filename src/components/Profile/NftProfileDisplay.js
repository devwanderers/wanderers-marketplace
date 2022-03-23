import React from 'react'
import { RankFrameSVG } from '../../assets/svg/frames'
import { FaSpinner } from 'react-icons/fa'

const NftProfileDisplay = ({ image, loading }) => {
    return (
        <div className="relative">
            <div className="absolute left-0 right-0 -top-0 bottom-0 ">
                <div className="w-full h-full">
                    <RankFrameSVG width={'100%'} height={'100%'} />
                </div>
            </div>
            {loading && (
                <div className="absolute left-0 right-0 h-full w-full flex items-center justify-center">
                    <FaSpinner
                        className={`animate-spin text-3xl text-primary`}
                    />
                </div>
            )}
            <div
                className="h-80 lg:h-56 xl:h-72 2xl:h-20rem h w-full overflow-hidden"
                style={{ padding: '5.5%' }}
            >
                {image ? (
                    <img
                        src={image}
                        alt={image}
                        className="w-full h-full object-fill"
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default NftProfileDisplay
