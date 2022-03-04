import React from 'react'
import { landsImages } from '../../assets/images/lands/index'

const NFTSmallDisplay = () => {
    return (
        <div className="flex flex-row items-end">
            <div className="w-28 h-28 mr-4 bg-blue-3 rounded-md p-2">
                <img
                    className="w-full h-full"
                    src={landsImages.houston}
                    alt={landsImages.houston}
                />
            </div>
            <div className="text-4xl text-white">Houston</div>
        </div>
    )
}
export default NFTSmallDisplay
