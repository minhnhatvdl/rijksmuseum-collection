import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useArtCollection } from "./useArtCollection";
import { mockArtObjects } from "../test/mocks/handlers";

vi.mock("./useRijksmuseumApi", () => ({
  useRijksmuseumApi: () => ({
    getCollection: vi.fn(() =>
      Promise.resolve({
        count: 2,
        artObjects: mockArtObjects,
      }),
    ),
    searchArtObjects: vi.fn((query) =>
      Promise.resolve({
        count: query === "art" ? 2 : 0,
        artObjects: query === "art" ? mockArtObjects : [],
      }),
    ),
  }),
}));

describe("useArtCollection", () => {
  it("initializes with loading state", () => {
    const { result } = renderHook(() => useArtCollection(undefined));

    const [state] = result.current;

    expect(state.isLoading).toBe(true);
    expect(state.artObjects).toEqual([]);
    expect(state.error).toBe(null);
  });

  it("loads art objects on initial render", async () => {
    const { result } = renderHook(() => useArtCollection(undefined));

    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    const [state] = result.current;
    expect(state.artObjects).toHaveLength(2);
    expect(state.artObjects[0].title).toBe("Clock and gunpowder horn");
  });

  it("refreshes art objects", async () => {
    const { result } = renderHook(() => useArtCollection(undefined));

    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    const [, actions] = result.current;

    act(() => {
      actions.refresh();
    });

    expect(result.current[0].isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    expect(result.current[0].artObjects).toHaveLength(2);
  });

  it("searches when query is provided", async () => {
    const { result } = renderHook(() => useArtCollection("art"));

    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    expect(result.current[0].artObjects).toHaveLength(2);
  });

  it("returns empty array for search with no results", async () => {
    const { result } = renderHook(() => useArtCollection("nonexistent"));

    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    expect(result.current[0].artObjects).toHaveLength(0);
  });
});
