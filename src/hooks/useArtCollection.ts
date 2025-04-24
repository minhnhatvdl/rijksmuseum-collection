import { useCallback, useState, useEffect } from "react";
import { ArtObject, CollectionParams } from "../api/types";
import { useRijksmuseumApi } from "./useRijksmuseumApi";

interface UseArtCollectionOptions {
  initialPage?: number;
  pageSize?: number;
  imageOnly?: boolean;
}

interface ArtCollectionState {
  artObjects: ArtObject[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  page: number;
}

interface ArtCollectionActions {
  loadMore: () => Promise<void>;
}

export function useArtCollection(
  options: UseArtCollectionOptions = {},
): [ArtCollectionState, ArtCollectionActions] {
  const { initialPage = 1, pageSize = 20, imageOnly = true } = options;

  const { getCollection } = useRijksmuseumApi();

  const [state, setState] = useState<ArtCollectionState>({
    artObjects: [],
    isLoading: true,
    isLoadingMore: false,
    error: null,
    hasMore: true,
    page: initialPage,
  });

  const fetchArtObjects = useCallback(
    async (page: number, append = false) => {
      try {
        setState((prev) => ({
          ...prev,
          isLoading: !append,
          isLoadingMore: append,
          error: null,
        }));

        const params: CollectionParams = {
          p: page,
          ps: pageSize,
          imgonly: imageOnly,
        };

        const response = await getCollection(params);

        const totalItems = response.count;
        const hasMoreItems = page * pageSize < totalItems;

        setState((prev) => ({
          ...prev,
          artObjects: append
            ? [...prev.artObjects, ...response.artObjects]
            : response.artObjects,
          isLoading: false,
          isLoadingMore: false,
          hasMore: hasMoreItems,
          page,
          error: null,
        }));
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Unknown error occurred");
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isLoadingMore: false,
          error,
        }));
      }
    },
    [getCollection, pageSize, imageOnly],
  );

  const loadMore = useCallback(async () => {
    if (state.isLoadingMore || !state.hasMore) return;

    const nextPage = state.page + 1;
    await fetchArtObjects(nextPage, true);
  }, [fetchArtObjects, state.isLoadingMore, state.hasMore, state.page]);

  // Initial fetch
  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        setState((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
        }));

        const params: CollectionParams = {
          p: initialPage,
          ps: pageSize,
          imgonly: imageOnly,
        };

        const response = await getCollection(params);

        if (!isCancelled) {
          const totalItems = response.count;
          const hasMoreItems = initialPage * pageSize < totalItems;

          setState((prev) => ({
            ...prev,
            artObjects: response.artObjects,
            isLoading: false,
            hasMore: hasMoreItems,
            page: initialPage,
            error: null,
          }));
        }
      } catch (error) {
        if (!isCancelled) {
          const err =
            error instanceof Error
              ? error
              : new Error("Unknown error occurred");
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: err,
          }));
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [initialPage, pageSize, imageOnly]);

  return [state, { loadMore }];
}
