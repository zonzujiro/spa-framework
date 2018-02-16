import App from './App';

const app = new App({
  root: document.getElementById('root'),
  city: new URLSearchParams(window.location.search).get('city'),
});
app.start();
