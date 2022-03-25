import React from 'react'
import Separator from './../../Separator/Separator'
import NftPropertieElement from './NftPropertieElement'

const NftProperties = ({ attributes }) => {
    return (
        <React.Fragment>
            <Separator title="Properties" className="mt-6" />
            {attributes && (
                <div className="flex flex-row flex-wrap pl-3 lg:pl-4 pr-5 lg:pr-20">
                    <NftPropertieElement
                        className="mt-6 mr-12 lg:mr-28"
                        title={attributes[0].trait_type}
                        value={attributes[0].value}
                    />
                    <NftPropertieElement
                        className="mt-6 mr-12 lg:mr-28"
                        title={attributes[1].trait_type}
                        value={attributes[1].value}
                    />
                    <NftPropertieElement
                        className="mt-6 mr-12 lg:mr-28"
                        title={attributes[2].trait_type}
                        value={attributes[2].value}
                    />
                    <NftPropertieElement
                        className="mt-6 mr-12 lg:mr-28"
                        title={attributes[3].trait_type}
                        value={attributes[3].value}
                    />
                </div>
            )}
        </React.Fragment>
    )
}

export default NftProperties
