import React from 'react'
import ElementContainer from './../Container/ElementContainer'

const RoleLabel = ({ title }) => {
    return (
        <ElementContainer className="px-3" rounded="md" variant="secondary">
            <span className="text-sm text-blue-10">{title}</span>
        </ElementContainer>
    )
}

export default RoleLabel
