import React from 'react'

import { Modal } from 'antd'
import { FaCopy, FaSpinner } from 'react-icons/fa'
import useCopyToClipboard from './../../hooks/useCopyToClipboard'
import { IoCloseOutline } from 'react-icons/io5'

const RefundModal = ({
    loading,
    visible,
    onCancel,
    onConfirm,
    tokensIdGenesis = [],
    tokensIdLand = [],
}) => {
    const [copyToClipboard] = useCopyToClipboard()
    return (
        <Modal
            visible={visible}
            centered
            closable={false}
            onCancel={onCancel}
            footer={null}
        >
            <div className="relative">
                <div
                    className="absolute p-1 -m-4 right-0 cursor-pointer"
                    onPointerDown={onCancel}
                >
                    <IoCloseOutline className="text-2xl" />
                </div>
                <div className="text-3xl text-center font-semibold">
                    Money back waranty
                </div>
                <div className="mt-4">
                    <span className="text-2xl">
                        Genesis Tokens:{' '}
                        {tokensIdGenesis.reduce(
                            (acc, v, index) =>
                                `${acc}${v}${
                                    tokensIdGenesis.length !== index + 1
                                        ? ', '
                                        : ''
                                }`,
                            ''
                        )}
                    </span>
                </div>
                <div>
                    <span className="text-2xl">
                        Destinatios Tokens:{' '}
                        {tokensIdGenesis.reduce(
                            (acc, v, index) =>
                                `${acc}${v}${
                                    tokensIdGenesis.length !== index + 1
                                        ? ', '
                                        : ''
                                }`,
                            ''
                        )}
                    </span>
                </div>
                <div className="mt-6 text-justify text-lg ">
                    The above token ids should be transferred to the following
                    address to get your refund. Once you close this window and
                    confirm the successful transfer, you must go back to your
                    profile and click on verify button. (You can transfer all of
                    them by using Open Sea multi transfer or your preferred
                    wallet)
                </div>

                <div className="w-full bg-blue-9 bg-opacity-75 rounded-sm flex justify-center mt-6">
                    <div className="flex flex-row py-8 gap-2 hover:text-blue-7">
                        <div
                            className="cursor-pointer"
                            onPointerDown={() =>
                                copyToClipboard(
                                    '0x0000000000000000000000000000000000000000'
                                )
                            }
                        >
                            0x0000000000000000000000000000000000000000
                        </div>
                        <button
                            className="relative -mt-1"
                            onPointerDown={() =>
                                copyToClipboard(
                                    '0x0000000000000000000000000000000000000000'
                                )
                            }
                        >
                            <FaCopy />
                        </button>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        disabled={
                            loading
                            // tokensIdGenesis.length > 0 ||
                            // tokensIdLand.length > 0
                        }
                        onClick={onConfirm}
                        className="bg-blue-6 rounded-md flex justify-center items-center w-full text-xl font-medium text-blue-5 disabled:opacity-40"
                    >
                        {!loading ? (
                            'Verify'
                        ) : (
                            <FaSpinner className="animate-spin text-2xl" />
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default RefundModal
