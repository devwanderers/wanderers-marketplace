/* eslint-disable no-unused-vars */
import React, { forwardRef } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { cls } from './../../services/helpers'

const classes = {
    base: 'inline-flex items-center focus:outline-none transition ease-in-out duration-300 rounded-md',
    disabled: 'opacity-50 cursor-not-allowed',
    pill: 'rounded-full',
    size: {
        small: 'px-2 py-1 text-sm',
        normal: 'px-4 py-2',
        large: 'px-8 py-3 text-lg',
    },
    variant: {
        primary:
            'bg-primary hover:bg-blue-green-2 focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-black-1',
        secondary:
            'bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white',
        danger: 'bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white',
        info: 'bg-blue-6 hover:bg-blue-10 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-blue-5',
        warning:
            'bg-yellow-600 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 text-white',
        warningLink:
            'bg-transparent hover:bg-gray-100 border border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 text-yellow-600',
    },
    spinnerSize: {
        small: 'text-xl',
        normal: 'text-2xl',
        large: 'text-3xl',
    },
}

const ButtonSpinner = forwardRef(
    (
        {
            children,
            className,
            loading = false,
            disabled,
            type = 'button',
            size = 'small',
            variant = 'primary',
            pill,
            spinnerSize = 'normal',
            ...restProps
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                type={type}
                className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${pill && classes.pill}
                ${disabled && classes.disabled}
                ${className}
            `)}
                {...restProps}
            >
                {loading && (
                    <FaSpinner
                        className={cls(
                            `animate-spin mr-3 ${classes.spinnerSize[spinnerSize]}`
                        )}
                    />
                )}
                {children}
            </button>
        )
    }
)

ButtonSpinner.displayName = 'ButtonSpinner'

export default ButtonSpinner
