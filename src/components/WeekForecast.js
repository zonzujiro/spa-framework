import { Component } from '../framework';

import DayWeekForecast from './DayWeekForecast';

class WeekForecast extends Component {
  constructor() {
    super();

    this.host = document.createElement('div');
    this.host.classList.add('week-forecast-container');
  }

  render() {
    const { forecast } = this.props;

    return `
      <h3>Forecast for 5 days</h3>
      <div class='week-forecast>
        ${forecast.map(DayWeekForecast).join('')}
      </div>
    `;
  }
}

export default WeekForecast;
