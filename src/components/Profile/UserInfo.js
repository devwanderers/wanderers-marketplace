import React from 'react'
import BannerProfile from './../../assets/svg/frames/BannerProfile'
import { cls } from './../../services/helpers'

const UserInfo = ({ className }) => {
    return (
        <div className={cls(`relative ${className}`)}>
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <div className="px-5">
                    <p className="text-light-0 text-xl">
                        <strong>USER:</strong> MR. SMITH
                    </p>
                    <p className="text-light-0 text-xl">
                        <strong>ID:</strong>: MR. SMITH
                    </p>
                </div>
            </div>
            <BannerProfile width="100%" />
        </div>
    )
}

export default UserInfo
