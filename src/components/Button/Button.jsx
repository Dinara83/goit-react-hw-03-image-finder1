import PropTypes from 'prop-types';

import css from './btn.module.css';

const Button = ({ onloadMore }) => {
  return (
    <button type="button" className={css.button} onClick={onloadMore}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
	loadMore: PropTypes.func.isRequired,
};
