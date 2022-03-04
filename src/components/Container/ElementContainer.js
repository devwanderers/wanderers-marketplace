import React, { forwardRef } from 'react'
import { cls } from './../../services/helpers'

const classes = {
    // base: 'px-3',
    rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        base: 'rounded',
        lg: 'rounded-lg',
        xl: 'rounded-xñ',
        full: 'rounded-lg',
    },
    size: {
        small: 'py-1',
        normal: 'py-2',
        large: 'py-3',
    },
    variant: {
        none: 'bg-none',
        primary: 'bg-primary',
        secondary: 'bg-green-3',
        danger: 'bg-red-500',
        warning: 'bg-yellow-600',
    },
}

const Element = (
    {
        children,
        className,
        rounded = 'md',
        size = 'small',
        variant = 'primary',
        ...props
    },
    ref
) => {
    return (
        <div
            ref={ref}
            className={cls(`
                ${classes.base}
                ${classes.rounded[rounded]}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${className}
            `)}
            {...props}
        >
            {children}
        </div>
    )
}

const ElementContainer = forwardRef(Element)

export default ElementContainer
