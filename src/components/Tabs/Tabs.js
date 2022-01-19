import React, { useState } from 'react'
import useDeepCompareEffect from './../../hooks/useDeepCompareEffect'

export const TabPane = ({ children, ...restProps }) => {
    return <div {...restProps}>{children}</div>
}

const Tabs = ({
    children,
    onChange,
    tabContainerClassName = '',
    panelContainerClassName,
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
        <div className="w-full">
            <div
                id="tabs"
                className={`w-full bg-blue-8 border-b-2 border-blue-11 ${tabContainerClassName}`}
            >
                <div className="max-w-1800px m-auto">
                    <div className="flex flex-row justify-center  md:justify-start text-2xl font-saira-condensed pl-5 space-x-5">
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
            <div
                id="tabs-pane"
                className={`bg-blue-10 relative py-16 ${panelContainerClassName}`}
            >
                <div className="absolute inset-0 background-pattern-polka py-10"></div>
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
                            className={`relative m-auto px-6 2xl:px-16 ${className}`}
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
