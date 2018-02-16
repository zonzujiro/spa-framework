const DayWeekForecast = ({ main }) => {
  const { temp, humidity, pressure } = main;

  return `
    <div class='forecast'>
      <h3 class='temperature'>${temp} F</h3>
      <p class='humidity'>humidity: ${humidity}</p>
      <p class='pressure'>pressure: ${pressure}</p>
    </div>
  `;
};

export default DayWeekForecast;
