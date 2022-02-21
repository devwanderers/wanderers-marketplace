import React from 'react'
import ButtonSpinner from '../Buttons/ButtonSpinner'

const InfoNft = (props) => {
    return (
        <div
            className="siFancyScrollbar flex-1 flex flex-col justify-between overflow-y-auto pr-4 lg:pr-8"
            style={{ maxHeight: '75vh' }}
        >
            <div>
                <p className="text-blue-4 text-base font-medium text-justify pb-8">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, odit ad. Optio natus quis quas temporibus ipsa?
                    Officiis provident libero ut ex perferendis, ullam aperiam
                    inventore mollitia! Atque cumque doloribus cum, error fugit
                    itaque blanditiis expedita in, sit tenetur magnam! Magni,
                    beatae. Eligendi nisi, pariatur iure quod laborum voluptatem
                    quidem, fugit sequi maxime amet aspernatur adipisci libero
                    repellat, vitae enim asperiores dolore nobis excepturi minus
                    quaerat molestiae? Consectetur vero explicabo reprehenderit
                    ab suscipit eius labore sunt a enim eveniet libero odit
                    nostrum placeat, maxime dolorum autem architecto aliquid at
                    asperiores. Cupiditate nesciunt aliquam voluptatem deleniti
                    ipsum non labore perferendis officia.
                </p>
                <div className="space-y-4">
                    <div>
                        <div>
                            <div className="text-primary text-sm pl-3">
                                Detail
                            </div>
                            <hr className="border-blue-4" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 pl-6 text-white py-4 w-10/12">
                            <div>
                                <div className="text-xs text-info">
                                    Example 1
                                </div>
                                <div className="uppercase text-sm font-medium text-blue-4">
                                    Lorem ipsum dolor
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-info">
                                    Example 1
                                </div>
                                <div className="uppercase text-sm font-medium text-blue-4">
                                    Lorem ipsum dolor
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-info">
                                    Example 1
                                </div>
                                <div className="uppercase text-sm font-medium text-blue-4">
                                    Lorem ipsum dolor
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-info">
                                    Example 1
                                </div>
                                <div className="uppercase text-sm font-medium text-blue-4">
                                    Lorem ipsum dolor
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-info">
                                    Example 1
                                </div>
                                <div className="uppercase text-sm font-medium text-blue-4">
                                    Lorem ipsum dolor
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-info">
                                    Example 1
                                </div>
                                <div className="uppercase text-sm font-medium text-blue-4">
                                    Lorem ipsum dolor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-20 ">
                <div>
                    <ButtonSpinner
                        className="px-28 py-4 text-3xl"
                        loading
                        spinnerSize="large"
                        // size="large"
                    >
                        Trade
                    </ButtonSpinner>
                </div>
            </div>
        </div>
    )
}

export default InfoNft
