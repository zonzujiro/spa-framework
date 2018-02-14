// Import from utls
class Component {
  constructor(listeners, root) {
    this._state = {};
    this.onCreation();
  }

  onCreation() {}
  onBeforeUpdate(state, nextState) {}
  receiveProps(nextProps) {}

  updateState(state) {
    const nextState = Object.assign({}, this._state, state);

    this.onBeforeUpdate(this._state, nextState);
    this._state = nextState;
    this.render();
  }

  render() {}
}

export default App;
