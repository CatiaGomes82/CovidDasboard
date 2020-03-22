import Head from 'next/head';
import Header from './Header/header';
import Footer from './Footer/footer';

import '../styles/normalize.css';
import '../styles/styles.css';

const Layout = props => (
  <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap" rel="stylesheet"></link>
    </Head>
    <React.Fragment>
      <Header />
      <main id="main" className="wrapper">
        {props.children}
      </main>
      <Footer />
    </React.Fragment>
  </React.Fragment>
);

export default Layout;