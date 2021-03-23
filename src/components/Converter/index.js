import React from 'react';
import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';
import Toggler from 'src/components/Toggler';

import currenciesData from 'src/data/currencies';
import './style.scss';

class Converter extends React.Component {
  // on définit un state initial
  state = {
    open: true,
    baseAmount: 1,
    currency: 'United States Dollar',
    search: '',
  }

  componentDidMount() {
    this.changeDocumentTitleEffect();
    document.addEventListener('keyup', this.onPressEscape);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currency } = this.state;

    if (prevState.currency !== currency) {
      this.changeDocumentTitleEffect();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onPressEscape);
  }

  changeDocumentTitleEffect = () => {
    const { currency } = this.state;

    document.title = `Euro to ${currency}`;
  }

  onPressEscape = (event) => {
    if (event.key === 'Escape') {
      this.toggle();
    }
  }

  toggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  setCurrency = (currency) => {
    this.setState({ currency });
  }

  setSearch = (value) => {
    this.setState({ search: value });
  }

  setBaseAmount = (value) => {
    this.setState({ baseAmount: value });
  }

  makeConversion = () => {
    const { currency, baseAmount } = this.state;

    const currencyData = currenciesData.find((currencyToFind) => (
      currencyToFind.name === currency
    ));

    const { rate } = currencyData;
    // const value = parseFloat((rate * baseAmount).toFixed(2), 10);
    const value = Math.round(rate * baseAmount * 100) / 100;

    return value;
  }

  getFilteredCurrencies = () => {
    const { search } = this.state;
    let filteredCurrencies = currenciesData;

    // tant qu'on a pas commencer à chercher une devise, on ne fait pas le filtrage
    if (search.length > 0) {
      // eslint-disable-next-line arrow-body-style
      filteredCurrencies = filteredCurrencies.filter((currency) => {
        const loweredCurrency = currency.name.toLowerCase();
        const loweredSearch = search.toLowerCase();

        return loweredCurrency.includes(loweredSearch);
      });
    }

    return filteredCurrencies;
  }

  render() {
    const {
      open,
      currency,
      baseAmount,
      search,
    } = this.state;

    return (
      <div className="converter">
        <Header
          baseAmount={baseAmount}
          setBaseAmount={this.setBaseAmount}
        />
        <Toggler
          toggle={this.toggle}
          isOpen={open}
        />
        {open && (
          <Currencies
            currencies={this.getFilteredCurrencies()}
            setCurrency={this.setCurrency}
            search={search}
            setSearch={this.setSearch}
          />
        )}
        <Amount
          value={this.makeConversion()}
          currency={currency}
        />
      </div>
    );
  }
}
export default Converter;
