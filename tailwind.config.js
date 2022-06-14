module.exports = {
    corePlugins: {
        preflight: false, // fix para que se apliquen los estilos de MUI
    },
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            especial: [
                '"Fira Sans Extra Condensed"',
                'Lato',
                '-apple-system',
                'system-ui',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                '"Roboto Condensed"',
                '"Source Sans Pro"',
                '"Cantarell"',
                'Candara',
                'Arial',
            ],
            serif: ['ui-serif', 'Georgia'],
            mono: ['ui-monospace', 'SFMono-Regular'],
            display: ['Oswald'],
            body: [
                'Lato',
                '-apple-system',
                'system-ui',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                '"Roboto Condensed"',
                '"Source Sans Pro"',
                '"Cantarell"',
                'Candara',
                'Arial',
            ],
            extend: {},
        },
    },
    plugins: [],
}
