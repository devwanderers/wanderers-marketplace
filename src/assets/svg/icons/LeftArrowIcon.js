import * as React from 'react'
import { forwardRef } from 'react'

const SvgComponent = ({ size = '1em', ...props }, ref) => (
    <svg
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 44.1 57.1"
        width={size}
        height={size}
        ref={ref}
        {...props}
    >
        <defs>
            <clipPath id="a" transform="translate(-3.7 -3.1)">
                <path
                    style={{
                        fill: 'none',
                    }}
                    d="M3.7 3.1h44.1v57.1H3.7z"
                />
            </clipPath>
        </defs>
        <title>{'isl-flecha_izquierda'}</title>
        <g
            style={{
                opacity: 0.9599999785423279,
            }}
        >
            <g
                style={{
                    clipPath: 'url(#a)',
                }}
            >
                <path
                    style={{
                        fill: '#fff',
                    }}
                    d="m43.9 36.2-12.6-7.7 12.6-7.6.2-.1v15.5l-.2-.1z"
                />
            </g>
            <g
                style={{
                    clipPath: 'url(#a)',
                }}
            >
                <path
                    style={{
                        fill: '#222',
                    }}
                    d="m43.9 20.9.2-.1v15.5l-.2-.1-12.6-7.7 12.6-7.6z"
                />
            </g>
            <g
                style={{
                    clipPath: 'url(#a)',
                }}
            >
                <path
                    style={{
                        fill: '#fff',
                    }}
                    d="m31.3 28.5 12.6-7.6v15.3l-12.6-7.7z"
                />
            </g>
            <g
                style={{
                    clipPath: 'url(#a)',
                }}
            >
                <path
                    style={{
                        fill: '#222',
                    }}
                    d="M43.9 20.9v15.3l.2.1V20.8l-.2.1z"
                />
            </g>
            <g
                style={{
                    clipPath: 'url(#a)',
                }}
            >
                <path
                    style={{
                        fill: '#222',
                    }}
                    d="M44.1 20.8v15.5l-.2-.1-12.6-7.7 12.6-7.6.2-.1z"
                />
            </g>
            <g
                style={{
                    clipPath: 'url(#a)',
                }}
            >
                <path
                    style={{
                        fill: '#6ebe9a',
                    }}
                    d="M44.1 20.8v15.5l-.2-.1-12.6-7.7 12.6-7.6.2-.1z"
                />
            </g>
            <g
                style={{
                    clipPath: 'url(#a)',
                }}
            >
                <path
                    d="M3.7 33.6h20.9l16.2 9.8a14.31 14.31 0 0 1 6.8 12.1v4.7L43 57.4l-3.8-2.3L5.8 34.9l-.3-.2Z"
                    transform="translate(-3.7 -3.1)"
                    style={{
                        fill: '#fff',
                    }}
                />
            </g>
            <g
                style={{
                    clipPath: 'url(#a)',
                }}
            >
                <path
                    d="M47.6 3.1v4.7a14.18 14.18 0 0 1-6.8 12.1l-16.2 9.8H3.7l1.8-1.1.3-.2L39.2 8.2 43 5.9Z"
                    transform="translate(-3.7 -3.1)"
                    style={{
                        fill: '#fff',
                    }}
                />
            </g>
        </g>
        <path
            style={{
                fill: '#6ebe9a',
            }}
            d="M44.1 20.8v15.5l-.2-.1-12.6-7.7 12.6-7.6.2-.1z"
        />
    </svg>
)

const LeftArrowIcon = forwardRef(SvgComponent)
export default LeftArrowIcon
