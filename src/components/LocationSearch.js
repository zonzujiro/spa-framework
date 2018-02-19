import { Component } from '../framework';

import { bindAll } from '../utils';

class LocationSearch extends Component {
  constructor() {
    super();

    this.state = {
      isValid: true,
    };

    bindAll(this, 'onSubmit');

    this.host = document.createElement('div');
    this.host.classList.add('location-search-container');
    this.host.addEventListener('submit', this.onSubmit);
  }

  isValidCityName(name) {
    return !!name && !/\d/.test(name);
  }

  onSubmit(ev) {
    ev.preventDefault();

    const city = ev.target.elements.city.value.trim();

    if (this.isValidCityName(city)) {
      this.props.onSubmit(city);

      if (!this.state.isValid) {
        this.updateState({ isValid: true });
      }
    } else {
      this.updateState({ isValid: false });
    }
  }

  render() {
    const { isValid } = this.state;
    const { inputValue } = this.props;

    return `
      <form class=${
        !isValid ? '"location-search -invalid"' : '"location-search"'
      }>
        <input required name='city' type='text' placeholder='City name' class='location-search-input' value=${inputValue}>
        <button class='location-search-submit'>Find</button>
        <button type='button' class='location-favorite'>Add to favorite</button>
      </form>
      <a href='#/login/13/46'>Login</a>
    `;
  }
}

export default LocationSearch;
