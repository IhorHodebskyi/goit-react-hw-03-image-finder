import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images, openModal }) => (
  <Gallery>
    {images.map(({ id, description, smallImage, largeImage }) => (
      <ImageGalleryItem
        key={id}
        description={description}
        smallImage={smallImage}
        largeImage={largeImage}
        openModal={openModal}
      />
    ))}
  </Gallery>
);
