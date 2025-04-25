import { http, HttpResponse } from "msw";
import { BASE_URL } from "../../api/rijksmuseumApi";

export const mockArtObjects = [
  {
    id: "en-NG-NM-768",
    objectNumber: "NG-NM-7687",
    title: "Clock and gunpowder horn",
    webImage: {
      url: "https://lh3.ggpht.com/lAJ1wnr_hEOncOfh9eKzvaS8w-fhLLq5yGlzHBctnjgyOzsbuP4cGIqP4q0A-YvnyXBhJi96il6NIZNhRVW-BVg2lW0=s0",
      width: 4725,
      height: 7064,
    },
    longTitle: "Clock and gunpowder horn, anonymous, c. 1590 - c. 1596",
    showImage: true,
  },
  {
    id: "en-BK-17496",
    objectNumber: "BK-17496",
    title: "Blue Parrot",
    webImage: {
      url: "https://lh3.ggpht.com/5sc-SGzzgobkHnmnykUi4B1PqMtadoFqXOhYLQmsAI0Mcs_FeCoXT6loaiAUhr_zKvp2iyXntDxVhCzeVwjFulsjzRE=s0",
      width: 5500,
      height: 7545,
    },
    longTitle: "Blue Parrot, Meissener Porzellan Manufaktur, 1731",
    showImage: true,
  },
];

export const handlers = [
  http.get(`${BASE_URL}/collection`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (query && query.toLowerCase().includes("clock")) {
      return HttpResponse.json({
        count: 1,
        artObjects: [mockArtObjects[0]],
      });
    }

    return HttpResponse.json({
      count: 2,
      artObjects: mockArtObjects,
    });
  }),
];
