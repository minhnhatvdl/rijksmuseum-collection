import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ArtObjectCard from "./ArtObjectCard";
import { mockArtObjects } from "../../../test/mocks/handlers";

const mockArtObject = mockArtObjects[0];

const mockArtObjectWithoutImage = {
  id: "en-NG-NM-768",
  objectNumber: "NG-NM-7687",
  title: "Clock and gunpowder horn",
  longTitle: "Clock and gunpowder horn, anonymous, c. 1590 - c. 1596",
  webImage: null,
  showImage: false,
};

describe("ArtObjectCard", () => {
  it("renders with image and title", () => {
    render(<ArtObjectCard artObject={mockArtObject} />);

    const image = screen.getByAltText("Clock and gunpowder horn");
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain(
      "https://lh3.ggpht.com/lAJ1wnr_hEOncOfh9eKzvaS8w-fhLLq5yGlzHBctnjgyOzsbuP4cGIqP4q0A-YvnyXBhJi96il6NIZNhRVW-BVg2lW0=s0",
    );

    const title = screen.getByText("Clock and gunpowder horn");
    expect(title).toBeInTheDocument();
  });

  it('displays "No image available" when artwork has no image', () => {
    render(<ArtObjectCard artObject={mockArtObjectWithoutImage} />);

    expect(screen.getByText("No image available")).toBeInTheDocument();
  });
});
