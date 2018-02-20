import Component from './Component';

import { isUrlParam, isEqualPaths, extractUrlParams } from '../utils';

const ANY_PATH = '*';

class Router extends Component {
  constructor(routes) {
    super();

    this.state = {
      activeRoute: null,
      activeComponent: null,
      routes,
    };

    this.host = document.createElement('div');

    window.addEventListener('hashchange', () =>
      this.handleUrlChange(this.path)
    );

    this.handleUrlChange(this.path);
  }

  get path() {
    return window.location.hash.slice(1);
  }

  handleUrlChange(url) {
    const { routes, activeRoute } = this.state;
    let nextRoute = routes.find(({ href }) => isEqualPaths(href, url));

    if (!nextRoute) {
      nextRoute = routes.find(({ href }) => href === ANY_PATH); //looking for any route
    }

    if (nextRoute && activeRoute !== nextRoute) {
      if (!!nextRoute.redirectTo) {
        return this.handleRedirect(nextRoute.redirectTo);
      }

      if (!!nextRoute.onEnter) {
        return this.handleOnEnter(nextRoute, url);
      }

      this.applyRoute(nextRoute, url);
    }
  }

  handleRedirect(url) {
    window.location.hash = url;
  }

  handleOnEnter(nextRoute, url) {
    const { href } = nextRoute;
    const params = extractUrlParams(href, url);

    Promise.resolve(nextRoute.onEnter(nextRoute, params)).then(() => {
      this.applyRoute(nextRoute, url);
    });
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
