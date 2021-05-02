export interface ImageSearchResponse {
  total: number;
  total_pages: number;
  results: ImageInfo[];
}

export interface ImageInfo {
  id: string;
  width: number;
  height: number;
  likes: number;
  description: string;
  urls: {
    regular: string;
    small: string;
  };
  links: {
    self: string;
    html: string;
    download: string
  }
}
