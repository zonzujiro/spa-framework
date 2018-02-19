import App from './App';
import LoginForm from './components/LoginForm';

export default [
  {
    href: '#/',
    component: App,
    onEnter: () => {},
    redirectTo: '/login',
  },
  {
    href: '#/login',
    component: LoginForm,
    onEnter: () => {},
  },
];
