import Link from 'next/link';

import './header.module.css';

const Header = () => (
  <header className="header">
    <div className="wrapper">
      <h1 className="header__title">
        <Link href="/">
          <a><span className="header__title-highlight">Covid-19</span></a>
        </Link>
        Global trends
      </h1>
    </div>
  </header>
);

export default Header;