import { noop, toHtml } from '../utils';

class LocationSearch {
  constructor({ onChange, onSubmit }) {
    this._state = {
      isValid: true,
    };

    this._domElement = null;
    this._props = null;

    this._onChange = onChange;
    this._onSubmit = onSubmit;
  }

  doRender(props) {
    this._props = Object.assign({}, props);
    this._domElement = this.createDomElement(props);

    return this._domElement;
  }

  render(props) {
    if (!this._props || this._props !== props) {
      return this.doRender(props);
    }

    return this._domElement;
  }

  createDomElement({ isValid, inputValue }) {
    const container = document.createElement('div');
    container.classList.add('location-search-container');

    container.addEventListener('change', ({ target }) => {
      this._onChange(target.value);
    });

    container.addEventListener('click', ({ target }) => {
      if (target.classList.contains('location-search-submit')) {
        this._onSubmit();
      }
    });

    const className = isValid
      ? '"location-search -invalid"'
      : '"location-search"';

    const innerHtml = `
      <div class=${className}>
        <input type='text' placeholder='City name' class='location-search-input' value=${inputValue}>
        <button class='location-search-submit'>Find</button>
      </div>`;

    container.append(toHtml(innerHtml));

    return container;
  }
}

export default LocationSearch;
