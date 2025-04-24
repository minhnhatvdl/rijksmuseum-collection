import { useCallback } from "react";
import ArtObjectGrid from "../feature/ArtObjectGrid/ArtObjectGrid";
import { useArtCollection } from "../../hooks/useArtCollection";
import styles from "./CollectionPage.module.css";

const CollectionPage = () => {
  const [
    { artObjects, isLoading, isLoadingMore, error, hasMore },
    { loadMore },
  ] = useArtCollection({
    pageSize: 20,
    imageOnly: true,
  });

  const handleLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  const renderContent = () => {
    if (isLoading && artObjects.length === 0) {
      return <p className={styles.loadingText}>Loading collection...</p>;
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
                <span className={styles.loadingButtonText}>Loading...</span>
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
      <div className={styles.contentArea}>{renderContent()}</div>
    </div>
  );
};

export default CollectionPage;
