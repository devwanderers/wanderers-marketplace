import * as React from 'react'
import { forwardRef } from 'react'

const SvgComponent = ({ size = '1em', ...props }, ref) => (
    <svg
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8.4 14.3"
        width={size}
        height={size}
        ref={ref}
        {...props}
    >
        <path
            d="M9.1 7.3c-.1.1-.2.3-.3.4-1.2.8-2.4 1.5-3.6 2.3a.63.63 0 0 1-.6 0C3.4 9.2 2.2 8.5 1 7.7.7 7.5.7 7.3.9 7c1.2-2 2.4-3.9 3.6-5.8.3-.4.5-.4.8 0C6.5 3.1 7.7 5 8.9 7c.1.1.1.2.2.3Z"
            transform="translate(-.7 -.9)"
            style={{
                fill: '#09a2d2',
            }}
        />
        <path
            d="M1.1 8.9a1.38 1.38 0 0 1 .4.3c1 .6 2 1.2 2.9 1.8a.75.75 0 0 0 .9 0c1-.6 1.9-1.2 2.9-1.8.2-.1.4 0 .6-.1 0 .2 0 .5-.1.6-1.1 1.7-2.3 3.5-3.4 5.2-.3.4-.5.4-.9 0-1.3-1.7-2.5-3.5-3.7-5.2.1-.1.1-.4.1-.5s.2-.2.3-.3Z"
            transform="translate(-.7 -.9)"
            style={{
                fill: '#09a2d2',
            }}
        />
    </svg>
)

const EthIcon = forwardRef(SvgComponent)
export default EthIcon
