import Component from './Component';

import {
  clearChildren,
  bindAll,
  isUrlParam,
  isEqualPath,
  extractUrlParams,
} from '../utils';

class Router extends Component {
  constructor(routes) {
    super();

    this.state = {
      activeRoute: null,
      activeComponent: null,
      routes,
    };

    this.host = document.createElement('div');

    bindAll(this, 'applyRoute', 'handleUrlChange');

    window.addEventListener('hashchange', this.handleUrlChange);
    this.handleUrlChange();
  }

  get path() {
    return window.location.hash.slice(1);
  }

  handleUrlChange() {
    const { routes, activeRoute } = this.state;
    const nextRoute = routes.find(({ href }) => isEqualPath(href, this.path));

    if (nextRoute && activeRoute !== nextRoute) {
      this.applyRoute(nextRoute, this.path);
    }
  }

  applyRoute(route, url) {
    const { activeComponent } = this.state;
    const componentInstance = new route.component();

    if (activeComponent) {
      activeComponent.unmount();
    }

    this.updateState({
      activeRoute: route,
      activeComponent: componentInstance,
    });
  }

  render() {
    const { href } = this.state.activeRoute;

    return this.state.activeComponent.mount({
      params: extractUrlParams(href, this.path),
    });
  }
}

export default Router;
