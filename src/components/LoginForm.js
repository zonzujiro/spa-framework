import { Component } from '../framework';

class LoginForm extends Component {
  constructor() {
    super();

    this.host = document.createElement('div');
    this.host.classList.add('form-login-container');
  }

  render() {
    return `
      <h3>Pizza application</h3>
      <form>
        <input type='text' name='login'/>
        <input type='password' name='password' />
      </form>
      <a href='#/'>Go to main</a>
    `;
  }
}

export default LoginForm;
