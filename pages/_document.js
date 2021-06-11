import Document from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'
import flush from 'styled-jsx/server'
import { Fragment } from 'react'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const styledComponentSheet = new StyledComponentSheets()
        const materialUiSheets = new MaterialUiServerStyleSheets()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />)),
                })
            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <Fragment key='styles'>
                        {initialProps.styles}
                        {materialUiSheets.getStyleElement()}
                        {styledComponentSheet.getStyleElement()}
                        {flush() || null}
                    </Fragment>
                ),
            }
        } finally {
            styledComponentSheet.seal()
        }
    }
}

// import Document from 'next/document'
// import { ServerStyleSheet } from 'styled-components'

// export default class MyDocument extends Document {
//     static async getInitialProps(ctx) {
//         const sheet = new ServerStyleSheet()
//         const originalRenderPage = ctx.renderPage

//         try {
//             ctx.renderPage = () =>
//                 originalRenderPage({
//                     enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
//                 })

//             const initialProps = await Document.getInitialProps(ctx)
//             return {
//                 ...initialProps,
//                 styles: (
//                     <>
//                         {initialProps.styles}
//                         {sheet.getStyleElement()}
//                     </>
//                 ),
//             }
//         } finally {
//             sheet.seal()
//         }
//     }
// }
