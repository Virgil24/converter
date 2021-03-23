import React from 'react';
import PropTypes from 'prop-types';

const Currency = ({ name, changeCurrency }) => {
  const handleOnClick = () => {
    changeCurrency(name);
  };

  return (
    <li
      className="currency"
      onClick={handleOnClick}
    >
      {name}
    </li>
  );
};

Currency.propTypes = {
  name: PropTypes.string.isRequired,
  changeCurrency: PropTypes.func.isRequired,
};

export default Currency;
