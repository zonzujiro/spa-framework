import App from './App';
import LoginForm from './components/LoginForm';

export default [
  {
    href: '/',
    component: App,
    onEnter: () => {},
    redirectTo: '/login',
  },
  {
    href: '/:id',
    component: LoginForm,
    onEnter: () => {},
  },
];
