import { noop, toHtml } from '../utils';

import DayWeekForecast from './DayWeekForecast';

class WeekForecast {
  constructor() {
    this._weekDayForecast = new DayWeekForecast();
  }

  render({ forecast }) {
    const container = document.createElement('div');
    container.classList.add('week-forecast-container');

    container.append(...forecast.map(this._weekDayForecast.render));

    return container;
  }
}

export default WeekForecast;
