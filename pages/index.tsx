import Head from 'next/head'
// I don't think we need this --> import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next';
// do we need to install this (for getServerSideProps) --> import { getSession } from 'next-auth/react';
import Menu from '../components/splash-menu';

// //ACCUMULUS VERSION 1
// import Head from 'next/head'
// import Menu from '../components/splash-menu'
// import Footer from '../components/footer'
// import Body from '../components/body'
// import './global.css'


//---------We will need this soon-------
//---------FETCH DATA HERE, pass down as needed---------
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   return {
//     props: {
//       session,
//     },
//   };
// };

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Accumulus</title>
        <meta name="description" content="Lambda baby" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h3> Menu component rendered from index.tsx file </h3>
        <Menu />
      </main>

      <footer className={styles.footer}>
        <p>Accumulus 2022</p>
      </footer>
    </div>
  )
}
//// //ACCUMULUS VERSION 1
// export default function Index() {
//   return (
//     <>
//       <Head>
//         <title>Accumulus</title>
//       </Head>
//       <Menu />
//       <Body />
//       <Footer />
//     </>
//   )
// }























//ORIGINAL MAIN CONTENT
        {/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}


        //ORIGINAL FOOTER CONTENT
                {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}