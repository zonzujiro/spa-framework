import Component from './Component';

import { clearChildren, bindAll } from '../utils';

import pathToRegexp from 'path-to-regexp';

class Router extends Component {
  constructor(routes) {
    super();

    this.state = {
      activetRoute: null,
      activeComponent: null,
      routes,
    };

    this.host = document.createElement('div');

    bindAll(this, 'applyRoute', 'handleUrlChange');

    window.addEventListener('hashchange', ev => {
      this.handleUrlChange(window.location.hash.slice(1));
    });

    this.handleUrlChange(window.location.hash.slice(1));
    let keys = [];
    let re = pathToRegexp('/users/:id', keys);
    console.log(re.exec('/users/13'));
  }

  compareRoute() {}

  extractParams(template, url) {
    const values = url.split('/');
    const params = {};

    return values
      ? template.split('/').reduce((acc, param, index) => {
          return Object.assign({}, acc, {
            [param]: values[index],
          });
        }, params)
      : params;
  }

  handleUrlChange(url) {
    const { routes, activetRoute } = this.state;

    const nextRoute = routes.find(({ href }) => href === url);

    // console.log(this.extractParams(route.href, url));

    if (nextRoute && activetRoute !== nextRoute) {
      this.applyRoute(nextRoute, url);
    }
  }

  applyRoute(route, url) {
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
