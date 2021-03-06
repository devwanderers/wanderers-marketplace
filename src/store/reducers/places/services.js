export const transformContryData = (data) => {
    let country = {}
    let places = {}

    for (let i = 0; i < data.length; i++) {
        const { image, places: p, name, ...rest } = data[i]
        country = {
            ...country,
            [name]: {
                name,
                image: `https://terramint.fra1.digitaloceanspaces.com/${image}`,
                ...rest,
            },
        }
        for (let x = 0; x < p.length; x++) {
            const place = p[x]
            places = {
                ...places,
                [place.place]: {
                    ...place,
                    country: name,
                    image: `https://terramint.fra1.digitaloceanspaces.com/${place.image}`,
                },
            }
        }
    }

    return [country, places]
}

export const transformPlaceData = (data) => {
    console.log({ data })
    return {
        ...data,
        image: `https://terramint.fra1.digitaloceanspaces.com/${data.image}`,
    }
}
