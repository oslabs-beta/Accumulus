import '../styles/globals.css'
import Menu from '../components/splash-menu';


function MyApp({ Component, pageProps }) {
  return (
  <>
    <Component {...pageProps} />
    {/* <h1>Splash Menu rendered from the _app file</h1>
    <Menu /> */}
  </>

  )
}

export default MyApp
