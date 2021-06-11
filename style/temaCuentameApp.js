// Para que funcione en automatico el dark y light, debemos quitar el background y text

import { createMuiTheme } from '@material-ui/core/styles'

const baseTheme = {
    palette: {
        common: {
            black: '#000',
            white: '#fff',
        },
        primary: { main: '#ff5953', contrastText: 'rgba(255,255,255,0.87)' },
        secondary: { main: '#c238da', contrastText: '#fff' },
        warning: { main: '#ff9800' },
        error: { main: '#f44336' },
        userBoxBackground: { light: '#eff7ff', main: '#4c5055' },
        salmon: {
            light: '#fd8b87',
            main: '#fa6660',
            dark: '#d44945',
            contrastText: '#fff',
        },
        esmeralda: {
            main: '#08d3b1',
            dark: '#00aa80',
            light: '#90fce1',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'system-ui',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto Condensed',
            'Source Sans Pro',
            'Cantarell',
            'Lato',
            'Candara',
            'Arial',
            'sans-serif',
        ].join(','),
    },
}

const temaLight = createMuiTheme({
    ...baseTheme,
    props: {
        MuiButton: {
            size: 'small',
        },
        MuiFilledInput: {
            margin: 'dense',
        },
        MuiFormControl: {
            margin: 'dense',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiListItem: {
            dense: true,
        },
        MuiOutlinedInput: {
            margin: 'dense',
        },
        MuiFab: {
            size: 'small',
        },
        MuiTable: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
        },
        MuiToolbar: {
            variant: 'dense',
        },
    },
    overrides: {
        MuiIconButton: {
            sizeSmall: {
                // Adjust spacing to reach minimal touch target hitbox
                marginLeft: 4,
                marginRight: 4,
                padding: 12,
            },
        },
    },
    palette: {
        ...baseTheme.palette,
        type: 'light',
        userBoxBackground: { main: '#f2ffef', dark: '#4c5055' },
        background: {
            paper: '#fff',
            default: '#fafafa',
            defaultTitle: '#eeeeee',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.70)',
            secondary: 'rgba(0, 0, 0, 0.40)',
            disabled: 'rgba(0, 0, 0, 0.30)',
            hint: 'rgba(0, 0, 0, 0.30)',
        },
    },
})

const temaDark = createMuiTheme({
    ...baseTheme,
    props: {
        MuiButton: {
            size: 'small',
        },
        MuiFilledInput: {
            margin: 'dense',
        },
        MuiFormControl: {
            margin: 'dense',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiListItem: {
            dense: true,
        },
        MuiOutlinedInput: {
            margin: 'dense',
        },
        MuiFab: {
            size: 'small',
        },
        MuiTable: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
        },
        MuiToolbar: {
            variant: 'dense',
        },
    },
    overrides: {
        MuiIconButton: {
            sizeSmall: {
                // Adjust spacing to reach minimal touch target hitbox
                marginLeft: 4,
                marginRight: 4,
                padding: 12,
            },
        },
    },
    palette: {
        ...baseTheme.palette,
        type: 'dark',
        userBoxBackground: { light: '#f2ffef', main: '#4c5055' },
        background: {
            defaultTitle: '#353535',
        },
    },
})

export { temaLight, temaDark }

// prefersDark: false
// Theme mode: light
// {
//   breakpoints: {
//     keys: [ 'xs', 'sm', 'md', 'lg', 'xl' ],
//     values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
//     up: [Function: up],
//     down: [Function: down],
//     between: [Function: between],
//     only: [Function: only],
//     width: [Function: width]
//   },
//   direction: 'ltr',
//   mixins: {
//     gutters: [Function: gutters],
//     toolbar: {
//       minHeight: 56,
//       '@media (min-width:0px) and (orientation: landscape)': [Object],
//       '@media (min-width:600px)': [Object]
//     }
//   },
//   overrides: {},
//   palette: {
//     common: { black: '#000', white: '#fff' },
//     type: 'light',
//     primary: {
//       main: '#ff5953',
//       salmon: '#ff5953',
//       light: 'rgb(255, 122, 117)',
//       dark: 'rgb(178, 62, 58)',
//       contrastText: '#fff'
//     },
//     secondary: {
//       main: '#c238da',
//       light: 'rgb(206, 95, 225)',
//       dark: 'rgb(135, 39, 152)',
//       contrastText: '#fff'
//     },
//     error: {
//       main: '#ff6400',
//       light: 'rgb(255, 131, 51)',
//       dark: 'rgb(178, 70, 0)',
//       contrastText: 'rgba(0, 0, 0, 0.87)'
//     },
//     warning: {
//       main: '#ff9800',
//       contrastText: '#ffcc00',
//       light: 'rgb(255, 172, 51)',
//       dark: 'rgb(178, 106, 0)'
//     },
//     info: {
//       light: '#64b5f6',
//       main: '#2196f3',
//       dark: '#1976d2',
//       contrastText: '#fff'
//     },
//     success: {
//       light: '#81c784',
//       main: '#4caf50',
//       dark: '#388e3c',
//       contrastText: 'rgba(0, 0, 0, 0.87)'
//     },
//     grey: {
//       '50': '#fafafa',
//       '100': '#f5f5f5',
//       '200': '#eeeeee',
//       '300': '#e0e0e0',
//       '400': '#bdbdbd',
//       '500': '#9e9e9e',
//       '600': '#757575',
//       '700': '#616161',
//       '800': '#424242',
//       '900': '#212121',
//       A100: '#d5d5d5',
//       A200: '#aaaaaa',
//       A400: '#303030',
//       A700: '#616161'
//     },
//     contrastThreshold: 3,
//     getContrastText: [Function: getContrastText],
//     augmentColor: [Function: augmentColor],
//     tonalOffset: 0.2,
//     text: {
//       primary: 'rgba(0, 0, 0, 0.87)',
//       secondary: 'rgba(0, 0, 0, 0.54)',
//       disabled: 'rgba(0, 0, 0, 0.38)',
//       hint: 'rgba(0, 0, 0, 0.38)'
//     },
//     divider: 'rgba(0, 0, 0, 0.12)',
//     background: { paper: '#fff', default: '#fafafa' },
//     action: {
//       active: 'rgba(0, 0, 0, 0.54)',
//       hover: 'rgba(0, 0, 0, 0.04)',
//       hoverOpacity: 0.04,
//       selected: 'rgba(0, 0, 0, 0.08)',
//       selectedOpacity: 0.08,
//       disabled: 'rgba(0, 0, 0, 0.26)',
//       disabledBackground: 'rgba(0, 0, 0, 0.12)',
//       disabledOpacity: 0.38,
//       focus: 'rgba(0, 0, 0, 0.12)',
//       focusOpacity: 0.12,
//       activatedOpacity: 0.12
//     },
//     salmon: {
//       light: '#fd8b87',
//       main: '#fa6660',
//       dark: '#d44945',
//       contrastText: '#fff'
//     },
//     esmeralda: {
//       main: '#08d3b1',
//       dark: '#00aa80',
//       light: '#90fce1',
//       contrastText: '#fff'
//     }
//   },
//   props: {},
//   shadows: [
//     'none',
//     '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
//     '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
//     '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
//     '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
//     '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
//     '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
//     '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
//     '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
//     '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
//     '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
//     '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
//     '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
//     '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
//     '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
//     '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
//     '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
//     '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
//     '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
//     '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
//     '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
//     '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
//     '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
//     '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
//     '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
//   ],
//   typography: {
//     htmlFontSize: 16,
//     pxToRem: [Function (anonymous)],
//     round: [Function: round],
//     fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//     fontSize: 14,
//     fontWeightLight: 300,
//     fontWeightRegular: 400,
//     fontWeightMedium: 500,
//     fontWeightBold: 700,
//     h1: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 300,
//       fontSize: '6rem',
//       lineHeight: 1.167
//     },
//     h2: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 300,
//       fontSize: '3.75rem',
//       lineHeight: 1.2
//     },
//     h3: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 400,
//       fontSize: '3rem',
//       lineHeight: 1.167
//     },
//     h4: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 400,
//       fontSize: '2.125rem',
//       lineHeight: 1.235
//     },
//     h5: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 400,
//       fontSize: '1.5rem',
//       lineHeight: 1.334
//     },
//     h6: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 500,
//       fontSize: '1.25rem',
//       lineHeight: 1.6
//     },
//     subtitle1: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 400,
//       fontSize: '1rem',
//       lineHeight: 1.75
//     },
//     subtitle2: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 500,
//       fontSize: '0.875rem',
//       lineHeight: 1.57
//     },
//     body1: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 400,
//       fontSize: '1rem',
//       lineHeight: 1.5
//     },
//     body2: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 400,
//       fontSize: '0.875rem',
//       lineHeight: 1.43
//     },
//     button: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 500,
//       fontSize: '0.875rem',
//       lineHeight: 1.75,
//       textTransform: 'uppercase'
//     },
//     caption: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 400,
//       fontSize: '0.75rem',
//       lineHeight: 1.66
//     },
//     overline: {
//       fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto Condensed,Source Sans Pro,Cantarell,Lato,Candara,Arial,sans-serif',
//       fontWeight: 400,
//       fontSize: '0.75rem',
//       lineHeight: 2.66,
//       textTransform: 'uppercase'
//     }
//   }
//   }
// }
