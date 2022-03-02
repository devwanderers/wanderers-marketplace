import React from 'react'
import ButtonSpinner from '../Buttons/ButtonSpinner'

const InfoNft = ({ title, description, detail, locationImg }) => {
    return (
        <div
            className="fancyScrollbar flex-1 flex flex-col justify-between overflow-y-auto pr-4 lg:pr-8"
            style={{ maxHeight: '75vh' }}
        >
            <div>
                <div className="mb-6 flex flex-row w-full">
                    <div
                        className="relative h-48 w-48  mr-4 overflow-hidden justify-center items-center border-t border-b border-blue-12"
                        style={{
                            padding: '4px',
                        }}
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={locationImg}
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
                    <div className="text-blue-4 text-base font-medium text-justify flex-1">
                        <p className=" break-words">{description}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <div>
                            <div className="text-primary text-sm pl-3">
                                Details
                            </div>
                            <hr className="border-blue-4" />
                        </div>
                        <div className="flex flex-col gap-4 pl-6 pr-6 text-white py-4 w-12/12">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <div className="text-xs text-info">ROI</div>
                                    <div className="uppercase text-sm font-medium text-blue-4">
                                        15%
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-info">
                                        Population
                                    </div>
                                    <div className="uppercase text-sm font-medium text-blue-4">
                                        2,161 millions
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-info">
                                        Visitors per year
                                    </div>
                                    <div className="uppercase text-sm font-medium text-blue-4">
                                        33.8 million
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-info">
                                        Area
                                    </div>
                                    <div className="uppercase text-sm font-medium text-blue-4">
                                        105,4 km²
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-20 ">
                <div>
                    <ButtonSpinner
                        className="px-16 py-2 text-3xl"
                        // loading
                        spinnerSize="large"
                        // size="large"
                    >
                        Trade
                    </ButtonSpinner>
                </div>
            </div>
        </div>
    )
}

export default InfoNft
