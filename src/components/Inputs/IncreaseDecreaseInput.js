import React, { useEffect, useState } from 'react'
import { InputArrowLeftSVG, InputArrowRightSVG } from '../../assets/svg/icons'

const IncreaseDecreaseInput = ({ onValueChange }) => {
    const [currentValue, setCurrentValue] = useState(1)
    useEffect(() => {
        onValueChange(currentValue)
    }, [currentValue])

    const handleDecresaseValue = () => {
        if (currentValue > 1) {
            setCurrentValue(currentValue - 1)
        }
    }
    const handleIncreaseValue = () => {
        if (currentValue < 15) {
            setCurrentValue(currentValue + 1)
        }
    }

    return (
        <div className="flex items-center my-4">
            <button
                className="flex-1 disabled:opacity-50 transform active:scale-75"
                onClick={handleDecresaseValue}
                disabled={currentValue === 1}
            >
                <InputArrowLeftSVG className="cursor-pointer h-10 m-auto " />
            </button>
            <div className="flex-1">
                <span className="text-89px font-bold select-none">
                    {currentValue}
                </span>
            </div>
            <button
                disabled={currentValue === 15}
                className="flex-1 disabled:opacity-50 transform active:scale-75"
                onClick={handleIncreaseValue}
            >
                <InputArrowRightSVG className="cursor-pointer h-10 m-auto" />
            </button>
        </div>
    )
}

export default IncreaseDecreaseInput
