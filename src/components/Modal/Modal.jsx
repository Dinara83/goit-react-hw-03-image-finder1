import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	  }

	  componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	  }

	  handleKeyDown = e => {
		if (e.code === 'Escape') {
		  this.props.onClose();
		}
	  };

	  handleBackdropClick = e => {
		if (e.currentTarget === e.target) {
		  this.props.onClose();
		}
	  };
	
  render() {
    const { children } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
  };