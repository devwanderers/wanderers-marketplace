/* eslint-disable prefer-regex-literals */
import React from 'react'
import { validateOnlyNumbers } from '../../services/input-services'
import useInput from './../../hooks/useInput'

import Input from './../Inputs/Input'
import ButtonSpinner from './../Buttons/ButtonSpinner'

const TradeNft = (props) => {
    const { bind } = useInput('', validateOnlyNumbers)

    return (
        <div className="flex-1 flex flex-col md:pr-4 lg:pr-8 ">
            <div className="mb-16">
                <div className="flex flex-row space-x-4 mb-12">
                    <div className="flex-1 flex flex-col">
                        <div htmlFor="price" className="text-white mb-2">
                            Price
                        </div>
                        <Input
                            className="border-blue-11 bg-blue-8 text-white"
                            id="price"
                            size="large"
                            {...bind}
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div htmlFor="total" className="text-white mb-2">
                            Total
                        </div>
                        <div className="bg-blue-8 w-full grid grid-cols-3 text-lg border border-blue-11  text-white">
                            <div className="col-span-2 border-r border-blue-11 py-3 px-3 text-right">
                                0
                            </div>
                            <div className="py-3 px-3 text-center">DDOT</div>
                        </div>
                    </div>
                </div>
                <div className="flex  flex-col-reverse md:flex-row justify-end md:space-x-4">
                    <div className="flex items-end">
                        <div className="text-2xl text-white text-right leading-7 tracking-wide w-full mt-2 md:mt-0">
                            OWNED
                        </div>
                    </div>
                    <div className="inline-flex space-x-2">
                        <ButtonSpinner
                            size="large"
                            loading
                            className="w-full md:w-56 justify-center py-5"
                        >
                            BUY
                        </ButtonSpinner>
                        <ButtonSpinner
                            size="large"
                            variant="danger"
                            loading
                            className="w-full md:w-56 justify-center py-5"
                        >
                            SELL
                        </ButtonSpinner>
                    </div>
                </div>
            </div>
            <hr className="border-blue-11" />
            <div className="pt-8">
                <ButtonSpinner
                    className="px-8 border"
                    size="normal"
                    variant="warningLink"
                    loading
                    spinnerSize="small"
                >
                    Refresh
                </ButtonSpinner>
                <div className="mt-12 text-2xl flex items-baseline justify-center w-full leading-7 text-center text-white opacity-50">
                    You have no Open Orders for this Land
                </div>
            </div>
        </div>
    )
}

export default TradeNft
