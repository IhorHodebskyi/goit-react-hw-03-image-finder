import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import { DivApp } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import * as Images from '../api/Images';
export class App extends Component {
  state = {
    searchName: '',
    page: 1,
    images: [],
    imagesOnPage: 0,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.getAllImages(searchName, page);
    }
    // if (prevState.searchName !== searchName) {
    //   this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

    //   console.log(searchName);

    //   getAllImages(searchName)
    //     .then(({ hits, totalHits }) => {
    //       const imagesArray = hits.map(hit => ({
    //         page: 1,
    //         id: hit.id,
    //         description: hit.tags,
    //         smallImage: hit.webformatURL,
    //         largeImage: hit.largeImageURL,
    //       }));

    //       return this.setState({
    //         page: 1,
    //         images: imagesArray,
    //         imagesOnPage: imagesArray.length,
    //         totalImages: totalHits,
    //       });
    //     })
    //     .catch(error => this.state({ error }))
    //     .finally(() =>
    //       this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
    //     );
    // }

    // if (prevState.searchName !== searchName || prevState.page !== page) {
    //   this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

    //   getAllImages(searchName, page)
    //     .then(({ hits }) => {
    //       const imagesArray = hits.map(hit => ({
    //         page: 1,
    //         id: hit.id,
    //         description: hit.tags,
    //         smallImage: hit.webformatURL,
    //         largeImage: hit.largeImageURL,
    //       }));

    //       return this.setState(({ images, imagesOnPage }) => {
    //         return {
    //           images: [...images, ...imagesArray],
    //           imagesOnPage: imagesArray.length,
    //         };
    //       });
    //     })
    //     .catch(error => this.setState({ error }))
    //     .finally(() =>
    //       this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
    //     );
    // }
  }

  getAllImages = async (searchName, page) => {
    try {
      this.setState({ isLoading: true });
      const { hits } = await Images.getAllImages(searchName, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        imagesOnPage: hits.length,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

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
    this.setState({
      searchName,
      page: 1,
      images: [],
      imagesOnPage: 0,
      totalImages: 0,
      isLoading: false,
      showModal: false,
      error: null,
    });
  };

  render() {
    const {
      images,
      imagesOnPage,

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

          {imagesOnPage === 12 && !isLoading && (
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
