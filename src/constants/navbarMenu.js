// /* eslint-disable no-unused-vars */
import { HomePath } from './routerConstants'

export const navbarMenu = [
    {
        id: 'home',
        title: 'Home',
        path: () => {
            window.location.replace('https://thewanderers.io/')
        },
    },
    { id: 'market', title: 'Marketplace', path: HomePath },
]
