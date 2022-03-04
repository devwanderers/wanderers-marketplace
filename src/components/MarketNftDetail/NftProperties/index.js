import React from 'react'
import Separator from './../../Separator/Separator'
import NftPropertieElement from './NftPropertieElement'

const NftProperties = (props) => {
    return (
        <React.Fragment>
            <Separator title="Properties" className="mt-6" />
            <div className="flex flex-row mt-6 pl-4 pr-20 gap-28">
                <NftPropertieElement title="ROI" value="15%" />
                <NftPropertieElement
                    title="Population"
                    value=" 2,161 millions"
                />
                <NftPropertieElement
                    title="Visitors per year"
                    value="33.8 MILLION"
                />
                <NftPropertieElement title="Area" value=" 105,4 km²" />
            </div>
        </React.Fragment>
    )
}

export default NftProperties
