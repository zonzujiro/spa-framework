import { noop, toHtml } from '../utils';

class DayWeekForecast {
  constructor() {}

  render({ main }) {
    const container = document.createElement('div');
    container.classList.add('weekday-forecast-container');

    const innerHtml = `
      <div class='forecast'>
        <h3 class='temperature'>${main.temp} F</h3>
        <p class='humidity'>humidity: ${main.humidity}</p>
        <p class='pressure'>pressure: ${main.pressure}</p>
      </div>
    `;

    container.append(toHtml(innerHtml));

    return container;
  }
}

export default DayWeekForecast;
