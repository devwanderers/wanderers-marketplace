import React from 'react'
import ButtonSpinner from '../Buttons/ButtonSpinner'

const BuyButton = (props) => {
    return (
        <ButtonSpinner
            className="w-20 justify-center font-semibold"
            size="small"
        >
            Sell
        </ButtonSpinner>
    )
}

export default BuyButton
