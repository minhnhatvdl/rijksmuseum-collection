import { ArtObject } from "../../../api/types";
import styles from "./ArtObjectCard.module.css";

interface ArtObjectCardProps {
  artObject: ArtObject;
}

const ArtObjectCard = ({ artObject }: ArtObjectCardProps) => {
  const imageUrl = artObject.webImage?.url ?? "";
  const title = artObject.title;
  const backgroundColor = "#f0f0f0";

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer} style={{ backgroundColor }}>
        {imageUrl && (
          <div className={styles.titleOverlay}>
            <h3 className={styles.overlayTitle}>{title}</h3>
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>
            <span>No image available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtObjectCard;
