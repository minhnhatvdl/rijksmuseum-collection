import styles from "./Header.module.css";
import rijksLogo from "../../../assets/rijksmuseum-logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <a href="/">
            <img src={rijksLogo} alt="Rijksmuseum" className={styles.logo} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
