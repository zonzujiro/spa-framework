import Component from '../framework/Component';

import { noop, toHtml } from '../utils';

import DayWeekForecast from './DayWeekForecast';

class WeekForecast extends Component {
  constructor() {
    super();
    // this._weekDayForecast = new DayWeekForecast();

    this.root = document.createElement('div');
    this.root.classList.add('week-forecast-container');
  }

  render() {
    const { forecast } = this.props;

    // container.append(...forecast.map(this._weekDayForecast.render));

    return forecast.map(DayWeekForecast).join('');
  }
}

export default WeekForecast;
