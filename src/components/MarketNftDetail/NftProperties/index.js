import React from 'react'
import Separator from './../../Separator/Separator'
import NftPropertieElement from './NftPropertieElement'

const NftProperties = ({ attributes }) => {
    return (
        <React.Fragment>
            <Separator title="Properties" className="mt-6" />
            {attributes && (
                <div className="flex flex-row flex-wrap pl-3 lg:pl-4 pr-5 lg:pr-20">
                    {attributes.map((v) => (
                        <NftPropertieElement
                            key={`property-${v.value}`}
                            className="mt-6 mr-12 lg:mr-28"
                            title={v.trait_type}
                            value={v.value}
                        />
                    ))}
                </div>
            )}
        </React.Fragment>
    )
}

export default NftProperties
