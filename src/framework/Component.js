import { toHtml, bindAll, clearChildren, append } from '../utils';

class Component {
  constructor(props) {
    this.state = {};
    this.props = props || {};
    this.host = null;

    bindAll(this, 'updateState', 'update');
  }

  _render() {
    const html = this.render();

    if (!html && this.host) {
      return this.host;
    }

    if (typeof html === 'string') {
      return append(clearChildren(this.host), toHtml(html));
    } else {
      return append(clearChildren(this.host), html);
    }
  }

  get name() {
    return this.constructor.name;
  }

  onBeforeUpdate(nextProps) {}
  onBeforeUnmount() {}

  unmount() {
    this.onBeforeUnmount();
  }

  update(nextProps) {
    this.onBeforeUpdate(nextProps);
    this.props = nextProps;
    return this._render();
  }

  updateState(state) {
    const nextState = Object.assign({}, this.state, state);

    this.state = nextState;
    this._render();

    return nextState;
  }

  render() {}
}

export default Component;
