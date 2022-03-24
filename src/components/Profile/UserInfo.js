import React from 'react'
import BannerProfile from './../../assets/svg/frames/BannerProfile'
import { cls } from './../../services/helpers'
import { formatAddress } from './../../services/address-services'

const UserInfo = ({ className, nftId, nftDNA }) => {
    return (
        <div className={cls(`relative ${className}`)}>
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <div className="px-5">
                    <p className="text-light-0 text-xl gap-2">
                        <strong>ID:</strong> {nftId}
                    </p>
                    <p className="text-light-0 text-xl gap-2">
                        <strong>DNA:</strong> {formatAddress(nftDNA)}
                    </p>
                </div>
            </div>
            <BannerProfile width="100%" />
        </div>
    )
}

export default UserInfo
