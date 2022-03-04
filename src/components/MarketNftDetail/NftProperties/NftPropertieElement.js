import React from 'react'

const NftPropertieElement = ({ title = 'Title', value = 'Value' }) => {
    return (
        <div className="">
            <div className="text-xs text-info">{title}</div>
            <div className="uppercase text-sm font-medium text-blue-9">
                {value}
            </div>
        </div>
    )
}

export default NftPropertieElement
