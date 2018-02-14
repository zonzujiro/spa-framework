import { noop, toHtml } from '../utils';

class TodayForecast {
  constructor() {}

  render({ forecast }) {
    const { name, main } = forecast;

    const container = document.createElement('div');
    container.classList.add('today-forecast-container');

    const innerHtml = `
      <h1 class='city-name'>${name}</h1>
      <div class='forecast'>
        <span class='temperature'>${main.temp}</span>
        <span class='humidity'>${main.humidity}</span>
        <span class='pressure'>${main.pressure}</span>
      </div>
    `;

    container.append(toHtml(innerHtml));

    return container;
  }
}

export default TodayForecast;
