import PropTypes from 'prop-types';

import css from './btn.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.button} onClick={onLoadMore}>
      Load more...
    </button>
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
