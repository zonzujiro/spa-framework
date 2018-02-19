import { Component } from './framework';

import { getForecast } from './utils/api';
import { bindAll, getMidnightWeather } from './utils';

import LocationSearch from './components/LocationSearch';
import TodayForecast from './components/TodayForecast';
import WeekForecast from './components/WeekForecast';

class App extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      hasError: false,
      todayForecast: null,
      weekForecast: null,
    };

    bindAll(
      this,
      'handleSearchSubmit',
      'handleHistoryChange',
      'computeNextState',
      'handleError',
      'updateState'
    );

    this.host = document.createElement('div');
    this.host.classList.add('application-container');

    this._todayForecast = new TodayForecast();
    this._weekForecast = new WeekForecast();
    this._locationSearch = new LocationSearch();

    window.addEventListener('popstate', ({ state }) => {
      this.updateState(state);
    });
  }

  onBeforeMount() {
    const city = new URLSearchParams(window.location.search).get('city');
    super.onBeforeMount();

    if (!!city) {
      this.getCityForecast(city).then(state => {
        window.history.replaceState(
          state,
          null,
          `?city=${state.todayForecast.name}`
        );
      });
    }
  }

  handleHistoryChange({ state }) {
    this.updateState(state);
  }

  handleError() {
    this.updateState({ hasError: true });
  }

  computeNextState([today, week]) {
    return {
      todayForecast: today,
      weekForecast: getMidnightWeather(week.list),
    };
  }

  handleSearchSubmit(city) {
    this.getCityForecast(city).then(state => {
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
    const { todayForecast, weekForecast, inputValue } = this.state;

    const toRender = [
      this._locationSearch.update({
        inputValue,
        onSubmit: this.handleSearchSubmit,
      }),
    ];

    if (todayForecast && weekForecast) {
      toRender.push(
        this._todayForecast.update({ forecast: todayForecast }),
        this._weekForecast.update({ forecast: weekForecast })
      );
    }

    return toRender;
  }
}

export default App;
