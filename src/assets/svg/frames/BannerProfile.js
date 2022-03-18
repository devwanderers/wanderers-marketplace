import * as React from 'react'
import { forwardRef } from 'react'

const SvgComponent = (props, ref) => (
    <svg
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 190.38 54.24"
        ref={ref}
        {...props}
    >
        <g
            style={{
                opacity: 0.18,
            }}
        >
            <path
                style={{
                    fill: '#09adc2',
                }}
                d="M4.92 1.97h180.53v50.3H4.92z"
            />
        </g>
        <path
            style={{
                fill: '#09adc2',
            }}
            d="M185.46 0h2.3v54.24h-2.3zM2.63 0h2.3v54.24h-2.3zM0 0h1.31v54.24H0zM189.07 0h1.31v54.24h-1.31z"
        />
    </svg>
)

const BannerProfile = forwardRef(SvgComponent)
export default BannerProfile
