import type { NextPage } from 'next'
import Head from 'next/head';
import Menu from '../components/splash-menu';
import styles from '../styles/Home.module.css'
import Counter from '../features/counter/Counter'

const IndexPage: NextPage = () => {
  return (
    <div className="bg red">
      <Head>
        <title>Accumulus</title>
        <meta name="description" content="Lambda baby" />
      </Head>

      <header>
        <Counter />
      </header>
      
      <Menu />
      <hr></hr>
      <h3>Pretend this is the splash page main body content</h3>
     
      <hr></hr>
      <p>Pretend this is the footer</p>
    </div>
  );
}

export default IndexPage;













//-------------GRAVEYARD---------------------------------------


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
{
  /* <h1 className={styles.title}>
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
        </div> */
}

//ORIGINAL FOOTER CONTENT
{
  /* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */
}


//ORIGINAL?
// I don't think we need this --> import Image from 'next/image'
//import { GetServerSideProps } from 'next';
// do we need to install this (for getServerSideProps) --> import { getSession } from 'next-auth/react';
// import Menu from '../components/splash-menu';

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

      {/* <nav className={styles.nav}>
        {/* <Menu /> */}
      {/* </nav> */}

      {/* <main>
        <h3 className="text-3xl font-bold underline">Landing Page Body Content</h3>
        <p className="text-3xl font-bold underline">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo dolorem
          sint placeat, veritatis quo enim architecto fugit deserunt excepturi
          quaerat nemo et reiciendis earum tenetur! Eum, nobis explicabo.
          Officia neque commodi libero quibusdam nostrum aliquam fuga quia
          deserunt tenetur facilis suscipit blanditiis cupiditate, similique hic
          dignissimos cumque omnis tempore? Illum.
        </p>
      </main>

      <footer className={styles.footer}>
        <p>Accumulus 2022</p> */}
      {/* </footer>  */}