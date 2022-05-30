/* eslint-disable no-unused-vars */
import { Spin } from 'antd'
import React, { useEffect, useRef, useCallback } from 'react'
import useInput from '../../hooks/useInput'

const EditMarker = ({
    countries,
    marker,
    markers = [],
    onHandleSelectMaker,
    onSave,
    onRemove,
    isLoading,
}) => {
    const prevMarkerSelected = useRef()
    const {
        value: valueCountry,
        bind: bindCountry,
        reset: resetCountry,
    } = useInput(marker?.data.id ?? '')

    const {
        value: valueMarker,
        // bind: bindMarker,
        setValue: setMarker,
        reset: resetMarker,
        reset,
    } = useInput(marker?.id ?? '')

    return (
        <div className="w-full px-12">
            <div className="text-center text-4xl font-bold mb-4">
                Edit Marker
            </div>{' '}
            <select {...bindCountry} className="w-full py-1 border-2 mb-2">
                <option value="" hidden>
                    Select Country
                </option>
                {countries.map((v, i) => {
                    return (
                        <option key={i} value={v.id}>
                            {v.country}
                        </option>
                    )
                })}
            </select>
            <select
                value={valueMarker}
                onChange={(e) => {
                    const val = e.target.value
                    setMarker(val)
                    const _marker = markers.find((v) => v.id === val)

                    if (onHandleSelectMaker) onHandleSelectMaker(_marker)
                }}
                className="w-full py-1 border-2  mb-2"
            >
                <option value="" hidden>
                    Select Marker
                </option>
                {markers.map((v, i) => {
                    return (
                        <option key={i} value={v.id}>
                            {v.id}-{v?.data?.country}
                        </option>
                    )
                })}
            </select>
            <div>
                <div className="text-lg font-bold">Position XYZ</div>
                <div className="flex flex-row space-x-2">
                    <div>X: {marker?.point?.x}</div>
                    <div>Y: {marker?.point?.y}</div>
                    <div>Z: {marker?.point?.z}</div>
                </div>
            </div>
            <div className="flex flex-row space-x-4 mt-4">
                <button
                    className="py-1 px-3  bg-blue-1 rounded-md text-white"
                    style={{ minWidth: '90px' }}
                    onClick={() => {
                        if (onSave) onSave(valueCountry)
                    }}
                    disabled={isLoading}
                >
                    {!isLoading ? 'Save Country' : <Spin />}
                </button>
                <button
                    onClick={() => {
                        if (onRemove) onRemove()
                    }}
                    className="py-1 px-3 bg-red-400 rounded-md text-white flex justify-center items-center"
                    style={{ minWidth: '90px' }}
                    disabled={isLoading}
                >
                    {!isLoading ? 'Remove Country' : <Spin />}
                </button>
            </div>
        </div>
    )
}

export default EditMarker
