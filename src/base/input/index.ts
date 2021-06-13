type Keymap = Map<string, boolean>;

class Input {
  constructor(public keyMap: Keymap, public preKeyMap: Keymap) {}
  private _getKeyFromMap(keyName: string, map: Keymap) {
    return map.has(keyName) ? map.get(keyName) : false;
  }
  private _getPrevKey(keyName: string) {
    return this._getKeyFromMap(keyName, this.preKeyMap);
  }
  getKey(keyName: string) {
    return this._getKeyFromMap(keyName, this.keyMap);
  }
  getKeyDown(keyName: string) {
    const prevDown = this._getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    return !prevDown && currentDown;
  }
  getKeyUp(keyName: string) {
    const prevDown = this._getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    return prevDown && !currentDown;
  }
}

class InputReceiver {
  public _keyMap: Keymap = new Map();
  public _prevKeyMap: Keymap = new Map();

  constructor() {
    window.addEventListener('keydown', (keyEvent: KeyboardEvent) =>
      this._keyMap.set(keyEvent.key, true)
    );
    window.addEventListener('keyup', (keyEvent: KeyboardEvent) =>
      this._keyMap.set(keyEvent.key, false)
    );
  }

  getInput() {
    const keyMap = new Map(this._keyMap);
    const prevKeyMap = new Map(this._prevKeyMap);
    this._prevKeyMap = new Map(this._keyMap);

    return new Input(keyMap, prevKeyMap);
  }
}
