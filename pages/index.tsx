// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App'

// const root = createRoot(document.querySelector('#root')!);

// root.render(
//     <App />
// )

import Head from 'next/head'
import Menu from '../components/menu'
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

 