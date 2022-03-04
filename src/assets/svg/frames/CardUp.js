import * as React from 'react'
import { forwardRef } from 'react'

const SvgComponent = (props, ref) => (
    <svg
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 68.64 3.51"
        ref={ref}
        {...props}
    >
        <path
            style={{
                fill: '#00ace0',
            }}
            d="M64.61 0H3.02L0 3.51h68.64L64.61 0z"
        />
    </svg>
)

const CardUp = forwardRef(SvgComponent)
export default CardUp
