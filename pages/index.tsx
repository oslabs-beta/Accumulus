
import Head from 'next/head'
import Menu from '../components/splash-menu'
import Footer from '../components/footer'
import Body from '../components/body'

export default function Index() {
  return (
    <>
      <Head>
        <title>Accumulus</title>
      </Head>
      <Menu />
      <Body />
      <Footer />
    </>
  )
}

 