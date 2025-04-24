export interface ArtObject {
  id: string;
  objectNumber: string;
  title: string;
  webImage: {
    url: string;
    width: number;
    height: number;
  } | null;
  longTitle: string;
  showImage: boolean;
}

export interface CollectionResponse {
  count: number;
  artObjects: ArtObject[];
}

export interface CollectionParams {
  p?: number;
  ps?: number;
  q?: string;
  imgonly?: boolean;
}
