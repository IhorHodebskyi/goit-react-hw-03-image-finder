import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  description,
  smallImage,
  largeImage,
  openModal,
}) => {
  return (
    <GalleryItem onClick={openModal}>
      <Img src={smallImage} alt={description} data-large={largeImage} />
    </GalleryItem>
  );
};
