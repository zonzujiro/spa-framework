const MIDNIGHT_HOURS = '00:00:00';

export const noop = () => {};

export const toHtml = string => {
  const template = document.createElement('template');
  template.innerHTML = string.trim();

  return template.content;
};

export const bindAll = (context, ...names) => {
  names.forEach(name => {
    if (typeof context[name] === 'function') {
      context[name] = context[name].bind(context);
    }
  });
};

export const getMidnightWeather = list => {
  return list.filter(({ dt_txt: date }) => date.includes(MIDNIGHT_HOURS));
};

export function RequestError(response) {
  this.status = response.statusText;
  this.code = response.status;
}

RequestError.prototype.toString = function() {
  return `${this.code} - ${this.status}`;
};
