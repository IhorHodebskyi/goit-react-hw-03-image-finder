import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images, openModal }) => (
  <Gallery>
    {images.map(({ id, tags, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        description={tags}
        smallImage={webformatURL}
        largeImage={largeImageURL}
        openModal={openModal}
      />
    ))}
  </Gallery>
);
