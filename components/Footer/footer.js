import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => (
  <footer className="footer">
    <div className="wrapper footer__wrapper">
      <p>Made with 🖤 by <a href="https://imcatia.com/">Catia Gomes</a>.</p>
      <p><a href="https://github.com/pomber/covid19">Data source</a></p>
    </div>
  </footer>
);

export default Footer;