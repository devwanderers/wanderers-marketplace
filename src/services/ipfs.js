import { NOMADZ_IPFS_URL } from './../constants/urlsConstants'

export const ipfsReplaceUri = (uri) => {
    return uri.replace(/^ipfs?:\/\//, NOMADZ_IPFS_URL)
}
