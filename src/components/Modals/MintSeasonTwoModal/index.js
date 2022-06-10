/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react'
import { Modal } from 'antd'
import ButtonSpinner from '../../Buttons/ButtonSpinner'

const MintSeasonTwoModal = ({
    tokenIds = [],
    visible,
    onOk,
    onCancel,
    ...props
}) => {
    const [{ value1, value2 }, setValue] = useState({
        value1: null,
        value2: null,
    })

    const optionsT1 = useMemo(() => {
        return Array.isArray(tokenIds)
            ? tokenIds
                  .map((v) => v.toString())
                  .reduce((acc, v) => (v === value2 ? acc : [...acc, v]), [])
            : []
    }, [tokenIds, value2])

    const optionsT2 = useMemo(() => {
        return Array.isArray(tokenIds)
            ? tokenIds
                  .map((v) => v.toString())
                  .reduce((acc, v) => (v === value1 ? acc : [...acc, v]), [])
            : []
    }, [tokenIds, value1])

    const handleOnChange = (e) => {
        const value = e.target.value
        const name = e.target.id === 'selectToken1' ? 'value1' : 'value2'

        setValue((state) => ({
            ...state,
            [name]: value,
        }))
    }

    const handleCancel = () => {
        setValue({ value1: null, value2: null })
        onCancel()
    }

    const handleOk = () => {
        if (value1 && value2) {
            onOk(value1, value2)
            onCancel()
            setValue({ value1: null, value2: null })
        }
    }

    const disabledOk = useMemo(() => {
        return !value1 || !value2
    }, [value1, value2])

    return (
        <Modal
            onCancel={handleCancel}
            visible={visible}
            centered
            closable={true}
            footer={null}
            maskClosable={true}
            {...props}
        >
            <div className="-mt-6 -mx-6 py-4 text-2xl border-b-2 px-6 border-green-5">
                Mint Season 2
            </div>
            <div className="pt-6">
                <p className="text-lg">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque, fuga at quos labore eos placeat beatae fugiat magni
                </p>
                <div className="flex flex-row gap-2 mt-8 w-full ">
                    <div className="flex-1">
                        <select
                            id="selectToken1"
                            className="w-full bg-green-5 rounded-md text-lg"
                            value={value1}
                            onChange={handleOnChange}
                        >
                            <option hidden value={null}>
                                Select Token
                            </option>
                            {optionsT1.map((v) => {
                                return (
                                    <option key={`Option1-nft${v}`} value={v}>
                                        Nft #{v}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex-1">
                        <select
                            id="selectToken2"
                            className="w-full bg-green-5 rounded-md text-lg"
                            value={value2}
                            onChange={handleOnChange}
                        >
                            <option hidden value={null}>
                                Select Token
                            </option>
                            {optionsT2.map((v) => {
                                return (
                                    <option key={`Option2-nft${v}`} value={v}>
                                        Nft #{v}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="flex flex-row justify-end w-full gap-2 mt-8 ">
                    <ButtonSpinner
                        onClick={handleCancel}
                        variant="secondary"
                        size="normal"
                        className="px-7"
                    >
                        Cancel
                    </ButtonSpinner>
                    <ButtonSpinner
                        onClick={handleOk}
                        size="normal"
                        className="px-7"
                        disabled={disabledOk}
                    >
                        Confirm
                    </ButtonSpinner>
                </div>
            </div>
        </Modal>
    )
}

export default MintSeasonTwoModal
