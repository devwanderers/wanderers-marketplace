import React from 'react'
import Countdown from 'react-countdown'
import ElementContainer from './../Container/ElementContainer'

const NftSaleCountDown = ({ props }) => {
    const date = new Date()
    date.setDate(date.getDate() + 1)

    return (
        <ElementContainer
            variant="none"
            size="normal"
            className="px-4 flex flex-col bg-blue-7"
        >
            <p className="text-blue-9 text-right">
                <strong className="text-primary">Sale end</strong> March 3, 2022
                at 9:53 am CST
            </p>
            <Countdown
                date={date}
                renderer={({ hours, minutes, seconds }) => (
                    <div
                        className="flex flex-row justify-between text-white text-base leading-none mt-1"
                        style={{ minWidth: '206px' }}
                    >
                        <p>
                            <strong className="text-xl">{hours}</strong> Hours
                        </p>
                        <p>
                            <strong className="text-xl">{minutes}</strong>{' '}
                            Minute
                        </p>
                        <p>
                            <strong className="text-xl">{seconds}</strong>{' '}
                            Second
                        </p>
                    </div>
                )}
            />
        </ElementContainer>
    )
}

export default NftSaleCountDown
