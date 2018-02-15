import Component from './framework/Component';

import { getForecast } from './utils/api';
import { bindAll, getMidnightWeather } from './utils';

import LocationSearch from './components/LocationSearch';
import TodayForecast from './components/TodayForecast';
import WeekForecast from './components/WeekForecast';

class App extends Component {
  constructor({ root, city }) {
    super();

    this.state = {
      inputValue: city || '',
      hasError: false,
      isValid: true,
      todayForecast: null,
      weekForecast: null,
    };

    bindAll(
      this,
      'handleSearchSubmit',
      'handleSearchChange',
      'handleHistoryChange',
      'computeNextState',
      'handleError',
      'updateState'
    );

    this.root = root;

    this._todayForecast = new TodayForecast();
    this._weekForecast = new WeekForecast();
    this._locationSearch = new LocationSearch();

    if (!!city) {
      this.getCityForecast(city).then(state => {
        window.history.replaceState(
          state,
          null,
          `?city=${state.todayForecast.name}`
        );
      });
    }

    window.addEventListener('popstate', ({ state }) => {
      this.updateState(state);
    });
  }

  handleSearchChange(inputValue) {
    this.state.inputValue = inputValue;
  }

  handleHistoryChange({ state }) {
    this.updateState(state);
  }

  handleError() {
    this.updateState({
      hasError: true,
      isLoading: false,
    });
  }

  isValidCityName(name) {
    //TODO: Add validation for numbers, html, etc
    return true;
  }

  computeNextState([today, week]) {
    return {
      todayForecast: today,
      weekForecast: getMidnightWeather(week.list),
      isLoading: false,
    };
  }

  handleSearchSubmit() {
    const city = this.state.inputValue.trim();

    if (!this.isValidCityName(city)) {
      this.updateState({ isValid: false });
      return;
    }

    this.getCityForecast(city).then(state => {
      window.history.pushState(
        state,
        null,
        `?city=${state.todayForecast.name}`
      );
    });
  }

  getCityForecast(city) {
    this.updateState({ isLoading: true });

    return getForecast(city)
      .then(this.computeNextState)
      .then(this.updateState)
      .catch(this.handleError);
  }

  render() {
    const {
      isLoading,
      todayForecast,
      weekForecast,
      isValid,
      inputValue,
    } = this.state;

    const cloned = this.root.cloneNode();
    const toRender = [
      this._locationSearch.update({
        isValid,
        inputValue,
        onChange: this.handleSearchChange,
        onSubmit: this.handleSearchSubmit,
      }),
    ];

    if (!isLoading && todayForecast && weekForecast) {
      toRender.push(
        this._todayForecast.update({ forecast: todayForecast }),
        this._weekForecast.update({ forecast: weekForecast })
      );
    }

    cloned.append(...toRender);
    this.root.replaceWith(cloned);
    this.root = cloned;
  }
}

export default App;
