import React, { useState } from 'react'
// import { Button } from 'antd'
import useDeepCompareEffect from './../../hooks/useDeepCompareEffect'

export const TabPane = ({ onClick, children }) => {
    return <div onClick={onClick}>{children}</div>
}

const TabsButton = ({ onChange, children }) => {
    const [keySelected, setkey] = useState(0)
    const arrayChildren = React.Children.toArray(children)

    useDeepCompareEffect(() => {
        onChange(keySelected)
        if (keySelected === 0 && arrayChildren.length > 0) {
            const _key = arrayChildren[0].props.tab
            setkey(_key)
        }
    }, [keySelected, arrayChildren])

    if (arrayChildren.length === 0) return null

    return (
        <div>
            <div id="tabs" className="mt-4 mb-5 space-x-3">
                {arrayChildren.map(({ props, key }, index) => (
                    <button
                        onClick={() => {
                            if (keySelected !== props.tab) {
                                setkey(props.tab)
                            }
                        }}
                        className={` text-lg px-9 py-1 rounded-md ${
                            keySelected === props.tab
                                ? 'ring-primary text-primary ring-1 dark:bg-blue-1 bg-white'
                                : ' text-gray-400 bg-gray-4 '
                        }`}
                        key={`tab-${props.tab}`}
                    >
                        {props.tab}
                    </button>
                ))}
                {/* <RenderButtons /> */}
            </div>
            <div id="tabs-pane" className="w-100 flex-auto">
                {arrayChildren.map(({ props }, index) => (
                    <div
                        role="tabpanel"
                        key={`pane-${props.tab}`}
                        hidden={keySelected !== props.tab}
                        className={`flex-none w-full `}
                    >
                        {props.children}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TabsButton
