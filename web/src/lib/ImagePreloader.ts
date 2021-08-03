export class ImagePreloader {
  private baseUrl: string | undefined;

  public constructor(baseUrl: string | undefined) {
    this.baseUrl = baseUrl;
  }

  public preloadImages(src: string[]) {
    src.forEach((s) => {
      const img = new Image();

      img.src = !!this.baseUrl ? `${this.baseUrl}/${s}` : s;
    });
  }
}
