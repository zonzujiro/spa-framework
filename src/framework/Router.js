import Component from './Component';

import { clearChildren, bindAll } from '../utils';

class Router extends Component {
  constructor({ routes }) {
    super();

    this.state = {
      activetRoute: null,
      activeComponent: null,
      routes,
    };

    this.host = document.createElement('div');

    bindAll(this, 'applyRoute', 'handleUrlChange');

    window.addEventListener('hashchange', ev => {
      this.handleUrlChange(window.location.hash);
    });

    this.handleUrlChange(window.location.hash);
  }

  handleUrlChange(url) {
    const { routes, activetRoute } = this.state;

    const nextRoute = routes.find(({ href }) => href === url);

    if (nextRoute && activetRoute !== nextRoute) {
      this.applyRoute(nextRoute);
    }
  }

  applyRoute(route) {
    const { activeComponent } = this.state;
    const componentInstance = new route.component();

    if (activeComponent) {
      activeComponent.unmount();
    }

    this.updateState({
      activetRoute: route,
      activeComponent: componentInstance,
    });
  }

  render() {
    return this.state.activeComponent.mount();
  }
}

export default Router;
