import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import { DivApp } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getAllImages } from 'api/Images';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
export class App extends Component {
  state = {
    searchName: '',
    page: 1,
    images: null,
    imagesOnPage: 0,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;

    if (prevState.searchName !== searchName) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      console.log(searchName);

      getAllImages(searchName)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState({
            page: 1,
            images: imagesArray,
            imagesOnPage: imagesArray.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.state({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      getAllImages(searchName, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      isLoading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;
    const handleFormSubmit = this.handleFormSubmit;
    const onNextFetch = this.onNextFetch;
    const openModal = this.openModal;
    const toggleModal = this.toggleModal;

    return (
      <>
        <DivApp>
          <Searchbar onSubmit={handleFormSubmit} />
          {images && <ImageGallery images={images} openModal={openModal} />}
          {isLoading && <Loader />}

          {imagesOnPage >= 12 && imagesOnPage < totalImages && (
            <Button onNextFetch={onNextFetch} />
          )}

          {showModal && (
            <Modal
              onClose={toggleModal}
              currentImageUrl={currentImageUrl}
              currentImageDescription={currentImageDescription}
            />
          )}
          {/* <ToastContainer /> */}
        </DivApp>
      </>
    );
  }
}
