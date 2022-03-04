import React from 'react'
import ElementContainer from './../Container/ElementContainer'

const RoleLabel = ({ title }) => {
    return (
        <ElementContainer className="px-3" rounded="sm" variant="secondary">
            <div
                className="text-sm text-blue-10"
                style={{ lineHeight: '14px' }}
            >
                {title}
            </div>
        </ElementContainer>
    )
}

export default RoleLabel
