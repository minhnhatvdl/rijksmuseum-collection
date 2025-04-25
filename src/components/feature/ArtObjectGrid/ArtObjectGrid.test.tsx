import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ArtObjectGrid from "./ArtObjectGrid";
import { mockArtObjects } from "../../../test/mocks/handlers";

vi.mock("../ArtObjectCard/ArtObjectCard", () => ({
  default: ({ artObject }: { artObject: any }) => (
    <div data-testid="art-object-card">{artObject.title}</div>
  ),
}));

describe("ArtObjectGrid", () => {
  it("renders grid with art objects", () => {
    render(<ArtObjectGrid artObjects={mockArtObjects} />);

    const cards = screen.getAllByTestId("art-object-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Clock and gunpowder horn");
    expect(cards[1]).toHaveTextContent("Blue Parrot");
  });

  it("displays empty message when no art objects are available", () => {
    render(<ArtObjectGrid artObjects={[]} />);

    expect(screen.getByText("No art objects found.")).toBeInTheDocument();
  });
});
