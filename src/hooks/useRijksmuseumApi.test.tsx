import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useRijksmuseumApi } from "./useRijksmuseumApi";

describe("useRijksmuseumApi", () => {
  it("returns initial state correctly", () => {
    const { result } = renderHook(() => useRijksmuseumApi());

    expect(result.current.error).toBe(null);
    expect(typeof result.current.getCollection).toBe("function");
    expect(typeof result.current.searchArtObjects).toBe("function");
  });

  it("fetches collection data successfully", async () => {
    const { result } = renderHook(() => useRijksmuseumApi());

    const fetchPromise = result.current.getCollection();

    const response = await fetchPromise;

    await waitFor(() => {
      expect(result.current.error).toBe(null);
    });

    expect(response.count).toBe(2);
    expect(response.artObjects).toHaveLength(2);
    expect(response.artObjects[0].title).toBe("Clock and gunpowder horn");
  });

  it("handles search correctly", async () => {
    const { result } = renderHook(() => useRijksmuseumApi());

    const searchQuery = "clock";
    const fetchPromise = result.current.searchArtObjects(searchQuery);

    const response = await fetchPromise;

    expect(response.count).toBe(1);
    expect(response.artObjects).toHaveLength(1);
    expect(response.artObjects[0].title).toBe("Clock and gunpowder horn");
  });
});
