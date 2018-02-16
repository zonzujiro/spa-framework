import { toHtml, bindAll, clearChildren, append } from '../utils';

class Component {
  constructor(props) {
    this.state = {};
    this.props = props || {};
    this.root = null;

    bindAll(this, 'updateState', 'update', '_render');
  }

  init() {
    if (Array.isArray(this.props.children)) {
      this.props.children.forEach(child => child.init());
    }
  }

  _render() {
    const htmlTag = this.render();

    return this.root && !!htmlTag
      ? append(clearChildren(this.root), toHtml(htmlTag))
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
