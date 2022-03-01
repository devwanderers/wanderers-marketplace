import * as React from 'react'
import { forwardRef } from 'react'

const SvgComponent = (props, ref) => (
    <svg
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 133.86 24.11"
        ref={ref}
        {...props}
    >
        <g
            style={{
                opacity: 0.36000001430511475,
            }}
        >
            <path
                style={{
                    fill: '#3cb396',
                }}
                d="M3.81 1.68h126.23v20.74H3.81z"
            />
        </g>
        <path
            style={{
                fill: '#3cb396',
            }}
            d="M129.66 0h1.96v24.11h-1.96zM2.24 0H4.2v24.11H2.24zM0 0h1.12v24.11H0zM132.74 0h1.12v24.11h-1.12z"
        />
    </svg>
)

const Banner = forwardRef(SvgComponent)
export default Banner
