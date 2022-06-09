import React from 'react'
import { Modal } from 'antd'

const Season2MintModal = ({ onCloseModal, ...props }) => {
    return (
        <Modal
            visible
            centered
            closable={true}
            footer={null}
            maskClosable={true}
            onCancel={onCloseModal}
            // title="MInt"
        >
            <div className="-mt-6 -mx-6 py-4 text-2xl border-b-2 px-6 border-green-5">
                Mint Season 2
            </div>
            <div className="pt-4">Hi</div>
        </Modal>
    )
}

export default Season2MintModal
