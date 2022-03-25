import React from 'react'
import Separator from './../../Separator/Separator'
import ImageDisplay from '../../ImagesDisplay/GImageDisplay'

const NftDetailsInfo = ({ detail }) => {
    return (
        <React.Fragment>
            <Separator title="Details" className="mt-4" />
            <div className="mt-6 flex flex-col md:flex-row w-full pr-5 md:pr-20">
                <div className="mx-auto mb-4 md:mx-0 md:mb-0">
                    <ImageDisplay img={detail?.image} />
                </div>
                <div className="text-blue-9 text-base font-medium text-justify flex-1">
                    <p className=" break-words">{detail?.description}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NftDetailsInfo
