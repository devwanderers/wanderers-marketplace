const removeEmptyStringAtEnd = (str) => {
    if (str.substring(str.length - 1, str.length) === ' ') {
        const newStr = str.substring(0, str.length - 1)
        return removeEmptyStringAtEnd(newStr)
    }
    return str
}

export const limitStringLengthTo = (limit, str = '') => {
    if (str.length < limit) return str
    return removeEmptyStringAtEnd(str.substring(0, limit)) + '...'
}
