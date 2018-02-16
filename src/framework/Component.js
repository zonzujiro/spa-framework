import { toHtml, bindAll, clearChildren, append } from '../utils';

class Component {
  constructor(props) {
    this.state = {};
    this.props = props || {};
    this.root = null;

    bindAll(this, 'updateState', 'update', '_render', 'onBeforeUpdate');
  }

  _render() {
    const html = this.render();

    if (!html && this.root) {
      return this.root;
    }

    if (typeof html === 'string') {
      return append(clearChildren(this.root), toHtml(html));
    } else {
      return append(clearChildren(this.root), html);
    }
  }

  onBeforeUpdate(nextProps) {}

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
