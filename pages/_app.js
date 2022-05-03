
import { AppWrapper } from '../context/dataContext';
import { UserWrapper } from '../context/userContext';

function MyApp({ Component, pageProps }) {
  return (
  <>
  <AppWrapper>
    <UserWrapper>
       <Component {...pageProps} />
    </UserWrapper>
  </AppWrapper>
  </>

  )
}

export default MyApp
