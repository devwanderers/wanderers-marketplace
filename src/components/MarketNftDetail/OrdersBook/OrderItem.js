import React from 'react'

const OrderItem = (props) => {
    return (
        <span className="h-14 w-full mb-1 flex flex-row items-center cursor-pointer text-white bg-blue-5 hover:bg-blue-1 rounded-2xl transition ease-in-out duration-300">
            <div className=" pl-6 w-full ml-auto text-left">
                <div className="flex items-center gap-0">0</div>
            </div>
            <div className="text-right pr-4 ">952.97</div>
            <div className="text-left pr-6">USDC</div>
        </span>
    )
}

export default OrderItem
