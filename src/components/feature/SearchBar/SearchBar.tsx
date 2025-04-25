import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  currentSearchTerm?: string;
}

const SearchBar = ({ onSearch, currentSearchTerm = "" }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (currentSearchTerm) {
      setSearchInput(currentSearchTerm);
    }
  }, [currentSearchTerm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchInput.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClear = () => {
    setSearchInput("");
    if (currentSearchTerm) {
      onSearch("");
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={handleChange}
              className={styles.searchInput}
              aria-label="Search"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.clearInputButton}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <button
            type="submit"
            className={styles.searchButton}
            disabled={!searchInput.trim()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
