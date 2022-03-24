import React, { useState } from 'react'

import useDeepCompareEffect from './../hooks/useDeepCompareEffect'
import useDebounce from './../hooks/useDebounce'

const withRemount = (WrappedComponent) => {
    const HOC = React.forwardRef((props, ref) => {
        const [reMount, setRemount] = useState(false)

        useDebounce(
            () => {
                if (reMount) setRemount(false)
            },
            300,
            [reMount]
        )

        useDeepCompareEffect(() => {
            console.log({ props })
            if (props.reMount) setRemount(true)
        }, [props, reMount])
        console.log({ reMount })
        return !reMount && <WrappedComponent ref={ref} {...props} />
    })
    HOC.displayName = 'withRemount'
    return HOC
}

export default withRemount
