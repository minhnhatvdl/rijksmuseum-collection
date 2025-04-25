import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
}

function Spinner({ size = "medium" }: SpinnerProps) {
  return (
    <div
      className={`${styles.spinner} ${styles[size]}`}
      role="status"
      aria-label="Loading"
    >
      <div className={styles.spinnerCircle}></div>
    </div>
  );
}

export default Spinner;
