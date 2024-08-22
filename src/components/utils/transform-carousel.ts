interface TransformCarouselProps {
  id: string;
  fileUrls: string[];
}

export const transformCarousel = (carousel: TransformCarouselProps) => {
  return carousel.fileUrls.map((file: string, index: number) => ({
    id: index,
    src: file,
    alt: `Carousel image ${index + 1}`,
  }));
};
