import { useCallback, useState } from "react";
import ArtObjectGrid from "../feature/ArtObjectGrid/ArtObjectGrid";
import SearchBar from "../feature/SearchBar/SearchBar";
import Spinner from "../common/Spinner/Spinner";
import { useArtCollection } from "../../hooks/useArtCollection";
import styles from "./CollectionPage.module.css";

const CollectionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [
    { artObjects, isLoading, isLoadingMore, error, hasMore },
    { loadMore, refresh },
  ] = useArtCollection(searchTerm, {
    pageSize: 20,
    imageOnly: true,
  });

  const handleSearch = useCallback(
    (query: string) => {
      setSearchTerm(query);
      if (query !== searchTerm) {
        refresh();
      }
    },
    [refresh, searchTerm],
  );

  const handleLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  const renderContent = () => {
    if (isLoading && artObjects.length === 0) {
      return (
        <div className={styles.loading}>
          <Spinner size="medium" />
          <p className={styles.loadingText}>Loading collection...</p>
        </div>
      );
    }

    if (error && artObjects.length === 0) {
      return <div className={styles.error}>Error: {error.message}</div>;
    }

    return (
      <>
        <ArtObjectGrid artObjects={artObjects} />

        {error && isLoadingMore && (
          <div className={styles.loadMoreError}>
            Error loading more items. Please try again.
          </div>
        )}

        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <button
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <Spinner size="small" />
                  <span className={styles.loadingButtonText}>Loading...</span>
                </>
              ) : (
                "Load more"
              )}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.collectionPage}>
      <SearchBar onSearch={handleSearch} currentSearchTerm={searchTerm} />
      <div className={styles.contentArea}>{renderContent()}</div>
    </div>
  );
};

export default CollectionPage;
