import { useCallback, useState } from "react";
import { fetchCollection } from "../api/rijksmuseumApi";
import { CollectionParams } from "../api/types";

export function useRijksmuseumApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getCollection = useCallback(async (params: CollectionParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      return await fetchCollection(params);
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error("Failed to fetch collection");
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getCollection,
  };
}
