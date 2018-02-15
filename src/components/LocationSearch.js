import Component from '../framework/Component';

import { noop, toHtml, bindAll, clearChildren } from '../utils';

class LocationSearch extends Component {
  constructor() {
    super();

    this.state = {
      isValid: true,
    };

    bindAll(this, 'onChange', 'onSubmit');

    this.root = document.createElement('div');
    this.root.classList.add('location-search-container');
    this.root.addEventListener('input', this.onChange);
    this.root.addEventListener('click', this.onSubmit);
  }

  isValidCityName(name) {
    return !!name && !/\d/.test(name);
  }

  onChange({ target }) {
    const { isValid } = this.props;
    const city = target.value.trim();

    if (this.isValidCityName(city)) {
      this.props.onChange(city);

      if (!isValid) {
        this.updateState({ isValid: true });
      }
    } else {
      this.updateState({ isValid: false });
    }
  }

  onSubmit({ target }) {
    if (
      target.classList.contains('location-search-submit') &&
      this.state.isValid
    ) {
      this.props.onSubmit();
    }
  }

  render() {
    const { isValid } = this.state;
    const { inputValue, onChange, onSubmit } = this.props;

    return `
      <div class=${
        !isValid ? '"location-search -invalid"' : '"location-search"'
      }>
        <input type='text' placeholder='City name' class='location-search-input' value=${inputValue}>
        <button class='location-search-submit'>Find</button>
        <button class='location-favorite'>Add to favorite</button>
      </div>`;
  }
}

export default LocationSearch;
