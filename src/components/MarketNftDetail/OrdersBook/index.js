import React from 'react'
import OrderItem from './OrderItem'

const OrdersBook = ({ orderTitle = 'SELL' }) => {
    return (
        <div className="">
            <span className="flex flex-nowrap text-white h-14 items-center ">
                <p className="  text-right min-w-min70 pl-6">
                    {orderTitle} ORDERS
                </p>
                <p className=" text-right pr-4 ml-auto min-w-min70">
                    {orderTitle} PRICE
                </p>
                <p className=" text-left min-w-min70 pr-6">TOKEN</p>
            </span>

            <div className="w-full">
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
            </div>
        </div>
    )
}

export default OrdersBook
