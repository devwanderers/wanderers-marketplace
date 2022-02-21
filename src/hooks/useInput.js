import { useState } from 'react'

const useInput = (initialValue, validate) => {
    const [value, setValue] = useState(initialValue)

    return {
        value,
        setValue,
        reset: () => setValue(''),
        bind: {
            value,
            onChange: (e) => {
                if (
                    (typeof validate === 'function' &&
                        validate(e.target.value)) ||
                    typeof validate !== 'function'
                )
                    setValue(e.target.value)
            },
        },
    }
}

export default useInput
