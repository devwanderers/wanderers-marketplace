import React from 'react'
import CardUp from './../../assets/svg/frames/CardUp'
import CardDown from './../../assets/svg/frames/CardDown'
import { cls } from './../../services/helpers'

const NFTDisplay = ({ title, nft, className }) => {
    return (
        <div className={cls(`w-full ${className}`)}>
            <div className="w-full flex justify-center">
                <CardUp width="50%" />
            </div>
            <div className="relative overflow-hidden justify-center items-center border-t border-b border-blue-10">
                <img className="w-full h-80 object-cover" src={nft} alt={nft} />
                <div
                    className="absolute left-0 top-0 border-l border-blue-10"
                    style={{ height: '20%' }}
                ></div>
                <div
                    className="absolute right-0 top-0 border-r border-blue-10"
                    style={{ height: '20%' }}
                ></div>
            </div>
            <div className="w-full flex justify-center">
                <CardDown width="50%" />
            </div>
        </div>
    )
}

export default NFTDisplay
