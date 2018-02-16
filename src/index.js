import App from './App';

const app = new App({
  root: document.getElementById('root'),
});
app.update({
  city: new URLSearchParams(window.location.search).get('city'),
});
