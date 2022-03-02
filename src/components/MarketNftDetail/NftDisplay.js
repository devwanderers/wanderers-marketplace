import React from 'react'

const NFTDisplay = ({ title, nft }) => {
    return (
        <div className="flex justify-center py-4">
            <div className="">
                <div className="text-4xl text-white text-center mb-8 ">
                    {title}
                </div>{' '}
                <div
                    className="relative h-64 w-64 mx-auto overflow-hidden justify-center items-center border-t border-b border-blue-12"
                    style={{
                        padding: '4px',
                    }}
                >
                    <img
                        className="w-full h-full object-cover"
                        src={nft}
                        alt={nft}
                    />
                    <div
                        className="absolute left-0 top-0 border-l border-blue-12"
                        style={{ height: '20%' }}
                    ></div>
                    <div
                        className="absolute right-0 top-0 border-r border-blue-12"
                        style={{ height: '20%' }}
                    ></div>
                    <div
                        className="absolute left-0 bottom-0 border-l border-blue-12"
                        style={{ height: '20%' }}
                    ></div>
                    <div
                        className="absolute right-0 bottom-0 border-r border-blue-12"
                        style={{ height: '20%' }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default NFTDisplay
