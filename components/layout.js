import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
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
        {children}
      </main>
      <Footer />
    </React.Fragment>
  </React.Fragment>
);

export default Layout;