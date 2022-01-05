import React from 'react'
// import { useEthers, useEtherBalance } from '@usedapp/core'
// import {  } from '@ethersproject/units'
// import useSupply from './../../hooks/useSupply'
// import { useLocalStorage } from '@usedapp/core'
import useSCInteractions from './../../hooks/useSCInteractions'

const SupplyCard = ({ title, supply }) => {
    return (
        <div className="border bg-white dark:bg-gray-4 border-gray-11 dark:border-gray-1 py-2 flex flex-col items-end pr-3 w-250px rounded-md space-y-2">
            <div className="text-lg text-gray-10 dark:text-gray-5">{title}</div>
            <div className="text-gray-10 dark:text-white font-medium text-3xl">
                {supply}
            </div>
        </div>
    )
}

const ConnectWalletHeader = () => {
    const { connect, disconnect, active, data } = useSCInteractions()
    // const [initiated, setInitiated] = useState(false)
    // const [walletActive, setValue] = useLocalStorage('wallet', false)

    // async function circulatingSupply() {
    //     try {
    //         const contract = new library.eth.Contract(
    //             DestinareContract,
    //             process.env.REACT_APP_DESTINARE_CONTRACT_ADDRESS
    //         )
    //         const _circulatingSupply = await contract.methods
    //             .circulatingSupply()
    //             .call()
    //         const getPresaleInfo = await contract.methods
    //             .getPresaleInfo()
    //             .call()
    //         const getUserInfo = await contract.methods.getUserInfo().call()
    //         console.log({ _circulatingSupply })
    //         console.log({ getPresaleInfo })
    //         console.log({ getUserInfo })
    //     } catch (ex) {
    //         console.log(ex)
    //     }
    // }

    // useEffectOnce(async () => {
    //     if (walletActive) await connect()
    //     setInitiated(true)
    // })

    // if (!initiated) return null

    const decimalsTotalSupply = data.totalSupply / 1000000000000000000

    return (
        <div className="w-full pt-4 dark:bg-blue-1 bg-light-2 border-b border-gray-11 dark:border-gray-1 select-none">
            <div className=" max-w-1650px mx-auto flex justify-between pb-6">
                <div className="font-medium text-3xl">
                    <span className="text-gray-10 dark:text-white">
                        Welcome to
                    </span>
                    <span className="text-primary"> Destinare</span>
                </div>
                <div className="flex flex-row space-x-5 leading-none">
                    <SupplyCard
                        title="Total Supply:"
                        supply={decimalsTotalSupply}
                    />
                    <SupplyCard
                        title="Circulating Supply:"
                        supply={data.circulatingSupply}
                    />
                    {/* <div className="text-white">
                        {etherBalance &&
                            parseFloat(formatEther(etherBalance)).toFixed(
                                3
                            )}{' '}
                        ETH
                    </div> */}
                    {/* <button
                        onClick={connectWallet}
                        className="bg-primary text-white font-semibold   border-none text-xl px-6 py-4 rounded-md hover:ring-blue-2 hover:ring-2 "
                    >
                        Connect Wallet
                    </button> */}
                    <div>
                        {!active ? (
                            <button
                                onClick={connect}
                                className="bg-primary text-white font-semibold   border-none text-xl px-6 py-4 rounded-md hover:ring-blue-2 hover:ring-2 "
                            >
                                Connect Wallet
                            </button>
                        ) : (
                            <button
                                onClick={disconnect}
                                className="bg-primary text-white font-semibold   border-none text-xl px-6 py-4 rounded-md hover:ring-blue-2 hover:ring-2 "
                            >
                                Disconnect
                            </button>
                        )}
                    </div>
                    {/* {active && (
                        <button
                            onClick={circulatingSupply}
                            className="bg-primary text-white font-semibold   border-none text-xl px-6 py-4 rounded-md hover:ring-blue-2 hover:ring-2 "
                        >
                            Supply
                        </button>
                    )} */}
                </div>
            </div>
        </div>
    )
}

export default ConnectWalletHeader
