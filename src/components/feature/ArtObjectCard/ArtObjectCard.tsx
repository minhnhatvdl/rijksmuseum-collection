import { memo, useEffect, useRef, useState } from "react";
import { ArtObject } from "../../../api/types";
import styles from "./ArtObjectCard.module.css";

const imageCache = new Set<string>();

interface ArtObjectCardProps {
  artObject: ArtObject;
}

const ArtObjectCard = memo(
  ({ artObject }: ArtObjectCardProps) => {
    const imageUrl = artObject.webImage?.url ?? "";
    const title = artObject.title;
    const [imageLoaded, setImageLoaded] = useState(imageCache.has(imageUrl));
    const imageRef = useRef<HTMLImageElement>(null);
    const backgroundColor = "#f0f0f0";

    // Check if the image is already loaded
    useEffect(() => {
      if (!imageUrl) return;

      const img = imageRef.current;
      if (img?.complete && img.naturalWidth > 0) {
        setImageLoaded(true);
        imageCache.add(imageUrl);
      }
    }, [imageUrl]);

    // Preload the image if it hasn't been loaded yet
    useEffect(() => {
      if (!imageUrl || imageCache.has(imageUrl)) return;

      let isMounted = true;

      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        if (isMounted) {
          imageCache.add(imageUrl);
          setImageLoaded(true);
        }
      };

      return () => {
        isMounted = false;
      };
    }, [imageUrl]);

    const handleImageLoad = () => {
      setImageLoaded(true);
      if (imageUrl) {
        imageCache.add(imageUrl);
      }
    };

    return (
      <div className={styles.card}>
        <div className={styles.imageContainer} style={{ backgroundColor }}>
          {imageUrl && (
            <div className={styles.titleOverlay}>
              <h3 className={styles.overlayTitle}>{title}</h3>
            </div>
          )}
          {imageUrl ? (
            <img
              ref={imageRef}
              src={imageUrl}
              alt={title}
              className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ""}`}
              onLoad={handleImageLoad}
              loading="eager"
            />
          ) : (
            <div className={styles.noImage}>
              <span>No image available</span>
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.artObject.id === nextProps.artObject.id,
);

export default ArtObjectCard;
