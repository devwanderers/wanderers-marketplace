import React from 'react'
import { cls } from './../../services/helpers'

const Separator = ({ title = 'Title', className }) => {
    return (
        <div className={cls(`flex flex-row items-end ${className}`)}>
            <div className="leading-none text-primary font-medium mr-2 text-base">
                {title}
            </div>
            <div className="flex-1 pr-1">
                <hr className="border-aqua-3" />
            </div>
        </div>
    )
}

export default Separator
