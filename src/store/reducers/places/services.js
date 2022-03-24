export const transformContryData = (data) => {
    const { image, places, ...rest } = data
    return { ...rest, image: `http://localhost:8080/images/${image}` }
}
