import React, { useState } from 'react'
import useDeepCompareEffect from './../../hooks/useDeepCompareEffect'

export const TabPane = ({ children, ...restProps }) => {
    return <div {...restProps}>{children}</div>
}

const Tabs = ({
    children,
    onChange,
    className,
    tabContainerClassName = '',
    panelContainerClassName = '',
}) => {
    const [selectedMenu, setSelectedMenu] = useState(0)
    const arrayChildren = React.Children.toArray(children)

    useDeepCompareEffect(() => {
        if (typeof onChange === 'function') onChange(selectedMenu)
        if (selectedMenu === 0 && arrayChildren.length > 0) {
            const _key = arrayChildren[0].props.tab
            setSelectedMenu(_key)
        }
    }, [selectedMenu, arrayChildren])

    if (arrayChildren.length === 0) return null

    return (
        <div className={`w-full ${className} `}>
            <div
                id="tabs"
                className={`w-full bg-blue-3 border-b border-aqua-3`}
            >
                <div className={tabContainerClassName}>
                    <div className="">
                        <div className="flex flex-row justify-start text-2xl font-saira-condensed space-x-5">
                            {arrayChildren.map(({ props, key }, index) => (
                                <a
                                    key={`tab-${props.tab}`}
                                    className={`px-3 pb-2   border-green-0 ${
                                        selectedMenu === props.tab
                                            ? 'border-b-4'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        if (selectedMenu !== props.tab) {
                                            setSelectedMenu(props.tab)
                                        }
                                    }}
                                >
                                    <div className="pt-4 text-white">
                                        {props.tab}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="tabs-pane"
                className={`relative ${panelContainerClassName}`}
            >
                {/* {!disableBackground && (
                    <div className="absolute inset-0 background-pattern-polka py-10"></div>
                )} */}
                {arrayChildren.map(({ props }, index) => {
                    const {
                        children,
                        tab,
                        className = '',
                        ...restProps
                    } = props
                    return (
                        <TabPane
                            key={`pane-${tab}`}
                            role="tabpanel"
                            hidden={selectedMenu !== tab}
                            className={`relative mx-auto  ${className}`}
                            {...restProps}
                        >
                            {children}
                        </TabPane>
                    )
                })}
            </div>
        </div>
    )
}

export default Tabs
