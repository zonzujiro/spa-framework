import { getForecast } from './utils/api';
import { bindAll, getMidnightWeather } from './utils';

import LocationSearch from './components/LocationSearch';
import TodayForecast from './components/TodayForecast';
import WeekForecast from './components/WeekForecast';

class App {
  constructor(root) {
    const city = new URLSearchParams(window.location.search).get('city');

    this._state = {
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
      'handleError'
    );

    this._root = root;

    this._todayForecast = new TodayForecast();
    this._weekForecast = new WeekForecast();
    this._locationSearch = new LocationSearch({
      onChange: this.handleSearchChange,
      onSubmit: this.handleSearchSubmit,
    });

    this.onCreation();
  }

  onCreation() {
    if (!!this._state.inputValue) {
      this.getCityForecast(this._state.inputValue).then(nextState => {
        window.history.replaceState(
          nextState,
          null,
          `?city=${nextState.todayForecast.name}`
        );
      });
    }

    window.addEventListener('popstate', ({ state }) => {
      this.updateState(state);
    });
  }

  onBeforeUpdate(state, nextState) {}

  updateState(state) {
    const nextState = Object.assign({}, this._state, state);

    this.onBeforeUpdate(this._state, nextState);
    this._state = nextState;
    this.render();

    return nextState;
  }

  handleSearchChange(inputValue) {
    this._state.inputValue = inputValue;
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
    const city = this._state.inputValue.trim();

    if (!this.isValidCityName(city)) {
      this.updateState({ isValid: false });
      return;
    }

    this.updateState({ isLoading: true });
    this.getCityForecast(city).then(stateSlice => {
      window.history.pushState(
        state,
        null,
        `?city=${state.todayForecast.name}`
      );
    });
  }

  getCityForecast(city) {
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
    } = this._state;

    const cloned = this._root.cloneNode();
    const toRender = [
      this._locationSearch.render({
        isValid,
        inputValue,
      }),
    ];

    if (!isLoading && todayForecast && weekForecast) {
      toRender.push(
        this._todayForecast.render({ forecast: todayForecast }),
        this._weekForecast.render({ forecast: weekForecast })
      );
    }

    cloned.append(...toRender);
    this._root.replaceWith(cloned);
    this._root = cloned;
  }
}

export default App;
