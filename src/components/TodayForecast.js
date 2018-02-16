import { Component } from '../framework';

import { noop, toHtml } from '../utils';

class TodayForecast extends Component {
  constructor() {
    super();

    this.host = document.createElement('div');
    this.host.classList.add('today-forecast-container');
  }

  render() {
    const { name, main } = this.props.forecast;

    return `
      <h1 class='city-name'>${name}</h1>
      <div class='forecast'>
        <span class='temperature'>${main.temp}</span>
        <span class='humidity'>${main.humidity}</span>
        <span class='pressure'>${main.pressure}</span>
      </div>
    `;
  }
}

export default TodayForecast;
