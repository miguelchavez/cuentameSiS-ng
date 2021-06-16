# Alfred to-do List

-   Leer config solo si hay sesion valida > \_app.jsx >> DarkMode
-   Implementar PushNotification para WEB.

-   Implementar un skeleton
    https://material-ui.com/components/skeleton/
    https://www.smashingmagazine.com/2020/04/skeleton-screens-react/
    https://github.com/buildo/react-placeholder
    https://betterprogramming.pub/the-what-why-and-how-of-using-a-skeleton-loading-screen-e68809d7f702
    https://github.com/dvtng/react-loading-skeleton#readme

-   Usar mediaquery para decidir como mostrar cosas

        import { useTheme } from '@material-ui/core/styles';
        import useMediaQuery from '@material-ui/core/useMediaQuery';

        function MyComponent() {
        const theme = useTheme();
        const matches = useMediaQuery(theme.breakpoints.up('sm'));

        return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
        }

# Modelos

grep -rn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next ".map(" ./
