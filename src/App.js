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

    this.root = root;

    this._todayForecast = new TodayForecast();
    this._weekForecast = new WeekForecast();
    this._locationSearch = new LocationSearch();

    window.addEventListener('popstate', ({ state }) => {
      this.updateState(state);
    });
  }

  handleHistoryChange({ state }) {
    this.updateState(state);
  }

  handleError() {
    this.updateState({
      hasError: true,
    });
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

  start() {
    const { inputValue } = this.state;

    if (!!inputValue) {
      this.getCityForecast(inputValue).then(state => {
        window.history.replaceState(
          state,
          null,
          `?city=${state.todayForecast.name}`
        );
      });
    } else {
      this.render();
    }
  }

  render() {
    const { todayForecast, weekForecast, inputValue } = this.state;

    const cloned = this.root.cloneNode();
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

    cloned.append(...toRender);
    this.root.replaceWith(cloned);
    this.root = cloned;
  }
}

export default App;
