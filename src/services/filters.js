export const filterSearch = (search, options) => {
    if (!search) return options

    const value = search.toUpperCase()
    const _options = options.reduce((acc, o) => {
        console.log({ o })
        if (o.label.toUpperCase().indexOf(value) > -1) {
            return [...acc, o]
        } else {
            return acc
        }
    }, [])
    return _options
}
