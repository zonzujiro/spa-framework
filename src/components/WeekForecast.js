import DayWeekForecast from './DayWeekForecast';

const WeekForecast = ({ forecast }) => {
  return `
    <div class='week-forecast-container'>
      ${forecast.map(DayWeekForecast).join('')}
    </div>
  `;
};

export default WeekForecast;
