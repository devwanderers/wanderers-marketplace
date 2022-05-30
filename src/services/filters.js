export const filterSearch = (search, options) => {
    console.log({ search, options })
    if (!search)
        return options.map((v) => {
            return { label: v.label, value: v.id }
        })

    const value = search.toUpperCase()
    const _options = options.reduce((acc, o) => {
        if (o.label.toUpperCase().indexOf(value) > -1) {
            // console.log({ o })
            return [...acc, { label: o.label, value: o.id }]
        }
        return acc
    }, [])
    return _options
}
