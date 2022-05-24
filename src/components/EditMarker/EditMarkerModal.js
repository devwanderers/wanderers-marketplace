import React from 'react'
import { Modal } from 'antd'
import useInput from './../../hooks/useInput'

const EditMarkerModal = ({ visible, marker, countries }) => {
    const { value } = useInput(
        marker?.data?.country ? marker?.data?.country : ''
    )

    // Fetch countries
    // Remove countries used by others makers except current marker

    return (
        <Modal visible={visible}>
            <div>Position XYZ</div>
            <div className="flex flex-row space-x-2">
                <div>X: {marker?.point.x}</div>
                <div>Y: {marker?.point.y}</div>
                <div>Z: {marker?.point.z}</div>
            </div>
            <select value={value}>
                <option value="" unselectable>
                    Select Country
                </option>
                {countries.map((v, i) => {
                    return (
                        <option key={i} value={v.id}>
                            {v.id}
                        </option>
                    )
                })}
            </select>
        </Modal>
    )
}

export default EditMarkerModal
