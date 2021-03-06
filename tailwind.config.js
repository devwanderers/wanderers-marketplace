const colors = require('tailwindcss/colors')
const theme = require('tailwindcss/defaultTheme')

module.exports = {
    // important: true,
    // important: true,
    purge: [],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        // height: {
        //     ...theme.height,
        //     // '450px': '450px',
        // },
        screens: {
            ...theme.screens,
            '3xl': '2560px',
        },
        spacing: {
            ...theme.spacing,
            '20rem': '20rem',
            '24px': '24px',
        },
        backgroundSize: {
            auto: 'auto',
            cover: 'cover',
            contain: 'contain',
            '50%': '50%',
            16: '4rem',
        },
        backgroundPosition: {
            bottom: 'bottom',
            'bottom-4': 'center bottom 1rem',
            center: 'center',
            left: 'left',
            'left-bottom': 'left bottom',
            'left-top': 'left top',
            right: 'right',
            'right-bottom': 'right bottom',
            'right-top': 'right top',
            top: 'top',
            'top-4': 'center top 1rem',
            '-top-7': 'center top -5rem',
            '-top-15': 'center top -15rem',
        },
        minWidth: {
            min70: '70px',
            minMobileWidth: '375px',
        },
        maxWidth: {
            '500px': '500px',
            '1000px': '1000px',
            '640px': '640px',
            '1100px': '1100px',
            '1280px': '1280px',
            '1300px': '1300px',
            '1800px': '1800px',
        },
        fontFamily: {
            'russo-one': ['Russo One', 'sans-serif'],
            'saira-condensed': ['Saira Condensed', 'sans-serif'],
        },
        colors: {
            // ...colors,
            red: colors.red,
            yellow: colors.yellow,
            gray: colors.trueGray,
            white: '#ffffff',
            primary: '#1BC09B',
            // secondary: '',
            info: '#00B5EB',
            transparent: 'transparent',
            dark: '#171230',
            darker: '#090416',
            green: {
                0: '#15a9be',
                1: '#243c49',
                2: '#2a4655',
                3: '#132a3d',
                4: '#4889A1',
                5: '#337184',
            },
            aqua: {
                1: '#7CC4D1',
                2: '#79add6',
                3: '#06334c',
            },
            blue: {
                // 2: '#141c2f',
                // 3: '#688CA5',
                // 4: '#81A4D5',
                1: '#334C8C',
                2: '#122135',
                3: '#141C2F',
                4: '#0d142e',
                5: '#203045', // Bordes
                6: '#09a2d2', // Bordes Cards
                7: '#0c1a34', //
                8: '#0a132a', // Navbar
                9: '#688CA5',
                10: '#00ace0',
            },
            light: {
                0: '#c4e3df',
            },
            black: {
                1: '#1d1d1b',
            },
        },
        fontSize: {
            xs: '.75rem',
            sm: '.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
            '8xl': '6rem',
            '2-75rem': '2.75rem',
            '2rem': '2rem',
            '89px': '89px',
            '53px': '53px',
            '23px': '23px',
            '40px': '40px',
            '27px': '27px',
            '34px': '34px',
        },
        extend: {
            backgroundImage: {
                render: "url('/src/assets/images/backgrounds/render-fondo.jpg')",
                'render-mobil':
                    "url('/src/assets/images/backgrounds/render-fondo-mobil.jpg')",
                earth: "url('/src/assets/images/backgrounds/bakgroundearth.png')",
            },
            margin: {
                84: '21rem',
                88: '22rem',
                92: '23rem',
                '-64px': '-64px',
                '-1px': '-1px',
            },
            padding: {
                '64px': '64px',
                '10px': '10px',
                '50px': '50px',
            },
            width: {
                '20rem': '20rem',
                '100px': '100px',
                '125px': '125px',
                '150px': '150px',
                '300px': '300px',
                '750px': '750px',
                '900px': '900px',
                '1000px': '1000px',
                '1025px': '1025px',
                '1100px': '1100px',
                '1280px': '1280px',
                '1800px': '1800px',
            },
        },
        backgroundColor: (theme) => ({
            ...theme('colors'),
        }),
        textColor: (theme) => theme('colors'),
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            scale: ['active'],
            ringWidth: ['focus'],
            // borderStyle: ['focus'],
        },
    },
    plugins: [],
}
