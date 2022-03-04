import React from 'react'
import LeftArrowIcon from './../../assets/svg/icons/LeftArrowIcon'

const BackButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-row items-center gap-2 transform hover:scale-110"
        >
            <div className="relative" style={{ top: '-1px' }}>
                <LeftArrowIcon size="1.5em" />
            </div>
            <div className="leading-none text-blue-9">Back</div>
        </button>
    )
}

export default BackButton
