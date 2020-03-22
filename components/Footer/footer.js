import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => (
  <footer className="footer">
    <div className="wrapper">
      <p>&copy; {new Date().getFullYear()} <a href="https://imcatia.com/">Catia Gomes</a>. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;