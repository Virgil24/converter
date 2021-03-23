import React from 'react';
import PropTypes from 'prop-types';
import Currency from './Currency';

import './style.scss';

const Currencies = ({
  currencies,
  setCurrency,
  search,
  setSearch,
}) => {
  // const { currencies } = props;
  // eslint-disable-next-line arrow-body-style
  const currenciesList = currencies.map((currency) => {
    // pour passer la fonction setCurrency jusqu'au composant
    // qui en a besoin, on vient faire une nouvelle prop à Currency
    // Currencies ici fait office de "passe-plat"
    return (
      <Currency
        key={currency.name}
        name={currency.name}
        changeCurrency={setCurrency}
      />
    );
  });

  // https://fr.reactjs.org/docs/forms.html#controlled-components
  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="currencies">
      <input
        className="currencies__search"
        type="text"
        placeholder="Rechercher"
        value={search}
        onChange={handleOnChange}
      />
      <ul className="currencies__list">
        {currenciesList}
      </ul>
    </div>
  );
};

Currencies.propTypes = {
  currencies: PropTypes.arrayOf(
    // pour décrire la forme de chaque objet contenu dans le tableau
    // on passe par la fonction shape() de PropTypes, elle prend un objet
    // en argument et on vient décrire le type de chaque propriété
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setCurrency: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Currencies;
