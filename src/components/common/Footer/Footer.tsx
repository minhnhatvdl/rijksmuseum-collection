import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>
              Rijksmuseum Collection Explorer
            </h4>
            <p className={styles.footerText}>
              Explore the masterpieces of the Rijksmuseum collection online.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>About</h4>
            <p className={styles.footerText}>
              This application uses the Rijksmuseum API to provide access to the
              museum's collection data and imagery.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
