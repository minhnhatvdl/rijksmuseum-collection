import { CollectionParams, CollectionResponse } from "./types";

const API_KEY = import.meta.env.VITE_RIJKSMUSEUM_API_KEY || "";
const BASE_URL = import.meta.env.VITE_RIJKSMUSEUM_BASE_URL || "";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `API error: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }
  return response.json() as Promise<T>;
};

const createSearchParams = (params: Record<string, any>): URLSearchParams => {
  const searchParams = new URLSearchParams({ key: API_KEY });

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "boolean") {
        searchParams.append(key, value ? "true" : "false");
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams;
};

export const fetchCollection = async (
  params: CollectionParams = {},
): Promise<CollectionResponse> => {
  const searchParams = createSearchParams(params);
  const response = await fetch(
    `${BASE_URL}/collection?${searchParams.toString()}`,
  );
  return handleResponse<CollectionResponse>(response);
};
