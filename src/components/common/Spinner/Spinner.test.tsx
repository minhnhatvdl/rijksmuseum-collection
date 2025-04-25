import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Spinner from "./Spinner";
import styles from "./Spinner.module.css";

describe("Spinner", () => {
  it("renders with default medium size", () => {
    render(<Spinner />);
    const spinnerElement = document.querySelector(`.${styles.spinner}`);
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass(styles.medium);
  });

  it("renders with small size when specified", () => {
    render(<Spinner size="small" />);
    const spinnerElement = document.querySelector(`.${styles.spinner}`);
    expect(spinnerElement).toHaveClass(styles.small);
  });

  it("renders with large size when specified", () => {
    render(<Spinner size="large" />);
    const spinnerElement = document.querySelector(`.${styles.spinner}`);
    expect(spinnerElement).toHaveClass(styles.large);
  });
});
