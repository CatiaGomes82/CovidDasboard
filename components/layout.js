import Head from 'next/head';
import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = props => (
  <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css"></link>
      </Head>
    <div style={layoutStyle}>
      <Header />
      {props.children}
    </div>
  </React.Fragment>
);

export default Layout;