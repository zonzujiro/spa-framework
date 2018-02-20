import Component from './Component';

import { clearChildren, bindAll, pathToRegexp } from '../utils';

// import pathToRegexp from 'path-to-regexp';

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
    let re = pathToRegexp('/user/:id/album/:userId');
    console.log(re);
    // console.log(re.exec('/user/13/album/14'));
    console.log(this.compareRoute('/user/13/album', '/user/:id/album/:userId'));
  }

  compareRoute(url, template) {
    return pathToRegexp(template).test(url);
  }

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
