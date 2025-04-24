import { ArtObject } from "../../../api/types";
import ArtObjectCard from "../ArtObjectCard/ArtObjectCard";
import styles from "./ArtObjectGrid.module.css";

interface ArtObjectGridProps {
  artObjects: ArtObject[];
}

const ArtObjectGrid = ({ artObjects }: ArtObjectGridProps) => {
  if (!artObjects || artObjects.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No art objects found.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {artObjects.map((artObject) => (
        <div key={artObject.id} className={styles.gridItem}>
          <ArtObjectCard artObject={artObject} />
        </div>
      ))}
    </div>
  );
};

export default ArtObjectGrid;
