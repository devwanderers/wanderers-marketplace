import React from 'react'

const GImageDisplay = ({ img }) => {
    return (
        <div
            className="relative h-48 w-48  mr-4 overflow-hidden justify-center items-center border-t border-b border-blue-6"
            style={{
                padding: '4px',
            }}
        >
            <img className="w-full h-full object-cover" src={img} alt={img} />
            <div
                className="absolute left-0 top-0 border-l border-blue-10"
                style={{ height: '20%' }}
            ></div>
            <div
                className="absolute right-0 top-0 border-r border-blue-10"
                style={{ height: '20%' }}
            ></div>
            <div
                className="absolute left-0 bottom-0 border-l border-blue-10"
                style={{ height: '20%' }}
            ></div>
            <div
                className="absolute right-0 bottom-0 border-r border-blue-10"
                style={{ height: '20%' }}
            ></div>
        </div>
    )
}

export default GImageDisplay
