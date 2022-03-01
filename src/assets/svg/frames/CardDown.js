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
                fill: '#09a2d2',
            }}
            d="M4.03 3.51h61.59L68.64 0H0l4.03 3.51z"
        />
    </svg>
)

const CardDown = forwardRef(SvgComponent)
export default CardDown
