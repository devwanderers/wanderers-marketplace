import React from 'react'
import ElementContainer from './../../Container/ElementContainer'

const NftDetailElement = ({ title = 'Title', value = 'Value' }) => {
    return (
        <ElementContainer variant="secondary" className="flex flex-row px-4">
            <div className="text-blue-10">{title}</div>
            <div className="ml-auto text-white">{value}</div>
        </ElementContainer>
    )
}

export default NftDetailElement
