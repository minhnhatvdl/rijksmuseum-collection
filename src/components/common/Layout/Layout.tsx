import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        const height = headerElement.offsetHeight;
        setHeaderHeight(height);
      }
    };
    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);
    return () => {
      window.removeEventListener("resize", calculateHeaderHeight);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main} style={{ paddingTop: `${headerHeight}px` }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
