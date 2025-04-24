import { useArtCollection } from "../../hooks/useArtCollection";
import ArtObjectGrid from "../feature/ArtObjectGrid/ArtObjectGrid";
import styles from "./CollectionPage.module.css";

const CollectionPage = () => {
  const [{ artObjects, isLoading, error }] = useArtCollection({
    pageSize: 20,
    imageOnly: true,
  });

  const renderContent = () => {
    if (isLoading && artObjects.length === 0) {
      return <p className={styles.loadingText}>Loading collection...</p>;
    }

    if (error && artObjects.length === 0) {
      return <div className={styles.error}>Error: {error.message}</div>;
    }

    return <ArtObjectGrid artObjects={artObjects} />;
  };

  return (
    <div className={styles.collectionPage}>
      <div className={styles.contentArea}>{renderContent()}</div>
    </div>
  );
};

export default CollectionPage;
