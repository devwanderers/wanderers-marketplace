import React from 'react'
import BannerProfile from './../../assets/svg/frames/BannerProfile'
import { cls } from './../../services/helpers'
import { formatAddress } from './../../services/address'
import { Tooltip } from 'antd'

const UserInfo = ({ className, nftId, tokenId, nftDNA }) => {
    return (
        <div className={cls(`relative ${className}`)}>
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <div className="px-5 space-y-1">
                    <p className="text-light-0 text-xl leading-none">
                        <strong>Token ID:</strong> {tokenId}
                    </p>
                    <p className="text-light-0 text-xl leading-none">
                        <strong>ID:</strong> {nftId}
                    </p>

                    <p className="text-light-0 text-xl leading-none">
                        <Tooltip title={nftDNA}>
                            <strong>DNA:</strong> {formatAddress(nftDNA)}
                        </Tooltip>
                    </p>
                </div>
            </div>
            <BannerProfile width="100%" />
        </div>
    )
}

export default UserInfo
