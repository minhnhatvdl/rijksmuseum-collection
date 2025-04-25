import { memo, useCallback } from "react";
import { ArtObject } from "../../../api/types";
import ArtObjectCard from "../ArtObjectCard/ArtObjectCard";
import styles from "./ArtObjectGrid.module.css";

interface ArtObjectGridProps {
  artObjects: ArtObject[];
}

const ArtObjectGrid = memo(
  ({ artObjects }: ArtObjectGridProps) => {
    const renderGridItem = useCallback((artObject: ArtObject) => {
      return (
        <div key={artObject.id} className={styles.gridItem}>
          <ArtObjectCard artObject={artObject} />
        </div>
      );
    }, []);

    if (!artObjects || artObjects.length === 0) {
      return (
        <div className={styles.empty}>
          <p>No art objects found.</p>
        </div>
      );
    }

    return <div className={styles.grid}>{artObjects.map(renderGridItem)}</div>;
  },
  (prevProps, nextProps) => {
    if (prevProps.artObjects === nextProps.artObjects) return true;
    if (prevProps.artObjects.length !== nextProps.artObjects.length)
      return false;

    // Check if the IDs of the art objects are the same
    return prevProps.artObjects.every(
      (art, i) => art.id === nextProps.artObjects[i].id,
    );
  },
);

export default ArtObjectGrid;
