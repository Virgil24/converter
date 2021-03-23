import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Header = ({ baseAmount, setBaseAmount }) => {
  const handleOnChange = (event) => {
    const newBaseAmount = Number(event.target.value);
    setBaseAmount(newBaseAmount);
  };

  return (
    <header className="header">
      <h1 className="header__title">Converter</h1>
      <p className="header__base-amount">
        <input
          className="header__input"
          type="number"
          value={baseAmount.toString()}
          onChange={handleOnChange}
        />
        <span>Euro</span>
      </p>
    </header>
  );
};

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
  setBaseAmount: PropTypes.func.isRequired,
};

export default Header;
