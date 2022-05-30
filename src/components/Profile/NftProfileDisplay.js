import React from 'react'
import { RankFrameSVG } from '../../assets/svg/frames'
import { FaSpinner } from 'react-icons/fa'
import { IoPersonCircle } from 'react-icons/io5'

const NftProfileDisplay = ({ image, nftsLength, loading }) => {
    let renderImage = null

    if (!loading && image) {
        const uri = image.replace(
            'QmdULeStJNouNGenv3ohiPJR818xCxY5U3P7iAaZiSMiRk',
            'QmPCyVuiP54PzuY94gaSspHjnTZcVbPoC7mLM4PY7vnhDe'
        )

        renderImage = (
            <img src={uri} alt={uri} className="w-full h-full object-fill" />
        )
    }
    if (!loading && nftsLength === 0)
        renderImage = (
            <div className=" text-white h-full w-full flex flex-col justify-center items-center">
                <IoPersonCircle size={'50%'} />
                <p className="text-center text-white px-10">
                    Remember!! in order to receive rewards you have to hold at
                    least one nomad
                </p>
            </div>
        )

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
                className="h-80 lg:h-56 xl:h-72 2xl:h-20rem w-full overflow-hidden"
                style={{ padding: '5.5%' }}
            >
                {renderImage}
            </div>
        </div>
    )
}

export default NftProfileDisplay
