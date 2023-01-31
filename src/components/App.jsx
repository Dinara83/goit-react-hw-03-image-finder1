import { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchApi } from 'components/services/api';

import { Loader } from 'components/Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

import css from './app-styles.module.css';

class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(_, prevState) {
    const { page, searchRequest } = this.state;
    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
      this.fetchSearchRequest();
    }
  }

  async fetchSearchRequest() {
    try {
      this.setState({ loading: true });
      const { page, searchRequest, images } = this.state;
      const data = await searchApi(searchRequest, page);
      console.log(searchApi);
      if (!images.length && !searchRequest) {
        this.setState({ loading: false });
        toast.error(
          `Sorry, there are no images matching your search ${searchRequest}. Please try again.`,
          {
            position: toast.POSITION.TOP_RIGHT,
            theme: 'colored',
          }
        );
        return;
      } else {
        this.setState(({ images }) => ({
          images: [...images, ...data.hits],
        }));
        this.setState({ total: data.totalHits });
        toast.success(`Hooray! We found ${data.totalHits} images.`);
      }
    } catch (error) {
      this.setState({ error: error.messege });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleSearchbarSubmit = ({ searchRequest }) => {
    this.setState({ searchRequest, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImage: { largeImageURL },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImage: null,
    });
  };

  render() {
    const {
      images,
      loading,
      error,
      largeImage,
      showModal,
      searchRequest,
    } = this.state;
    const { handleSearchbarSubmit, loadMore, closeModal, openModal } = this;

    return (
      <div className={css.app}>

        <Searchbar onSubmit={handleSearchbarSubmit} />

       <ImageGallery images={images} openModal={openModal} />

        {loading && <Loader />}
        {error && <p>{error}</p>}
        {!searchRequest && <p>Please enter a request</p>}

        <ToastContainer autoClose={3000} />

        {Boolean(images.length) && (
          <Button onClick={loadMore} />
        )}

        {showModal && (
          <Modal onClose={closeModal}>
            <img src={largeImage} alt="" />
          </Modal>

        )}
      </div>
    );
  }
}

export default App;
