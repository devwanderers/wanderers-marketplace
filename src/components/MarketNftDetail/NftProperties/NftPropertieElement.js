import React from 'react'
import { cls } from './../../../services/helpers'

const NftPropertieElement = ({
    title = 'Title',
    value = 'Value',
    className,
}) => {
    return (
        <div className={cls(` ${className}`)}>
            <div className="text-xs text-info">{title}</div>
            <div className="uppercase text-sm font-medium text-blue-9">
                {value}
            </div>
        </div>
    )
}

export default NftPropertieElement
