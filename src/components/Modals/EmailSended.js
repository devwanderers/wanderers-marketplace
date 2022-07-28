import React from 'react'

import { Modal } from 'antd'
const EmailSended = ({ visible, onCancel }) => {
    return (
        <Modal
            visible={visible}
            centered
            closable={false}
            onCancel={onCancel}
            maskClosable={false}
            footer={null}
        >
            <div>
                <div className="text-2xl  font-semibold text-center mt-4">
                    We just started your verification process. Once we confirm
                    your transfer the right NFTs. Your money will be transferred
                    to your account.
                </div>

                <div className="mt-16 flex justify-center">
                    <button
                        onClick={onCancel}
                        className="bg-blue-6 rounded-md flex justify-center items-center w-full text-xl font-medium text-blue-5 disabled:opacity-40"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default EmailSended
