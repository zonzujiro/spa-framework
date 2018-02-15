import { toHtml, bindAll, clearChildren, append } from '../utils';

class Component {
  constructor(props) {
    this.state = {};
    this.props = props || {};
    this.root = null;

    bindAll(this, 'updateState', 'update', '_render');
  }

  _render() {
    return this.root
      ? append(clearChildren(this.root), toHtml(this.render()))
      : this.root;
  }

  update(nextProps) {
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
