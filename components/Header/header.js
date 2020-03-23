import Link from 'next/link';

import './header.module.css';

const Header = () => (
  <header className="header">
    <div className="wrapper header__wrapper">
      <h1 className="header__title">
        <Link href="/">
          <a><span className="header__title-highlight">Covid-19</span></a>
        </Link>
        Countries data
      </h1>
      <h2 className="header__tagline">
        <a href="https://www.gov.uk/coronavirus">
          #StayHomeSaveLifes
          </a>
      </h2>
    </div>
  </header>
);

export default Header;