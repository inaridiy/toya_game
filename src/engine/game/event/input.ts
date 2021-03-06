import { Vec2 } from '../../shape/vector';

type Keymap = Map<string, boolean>;

export class InputReceiver {
  private _keyinputReceiver = new KeyInputReceiver();

  getInput(): Input {
    const keyInput = this._keyinputReceiver.getInput();
    const direction = this.getDirection(keyInput);
    const [isShot, isSlow, isBomb] = [
      keyInput.getKey(' ') || keyInput.getKey('z'),
      keyInput.getKey('Shift'),
      keyInput.getKey('x'),
    ];

    return new Input(direction, isShot, isSlow, isBomb, keyInput);
  }

  getDirection(ketInput: KeyInput): Vec2 {
    const direction = new Vec2(0, 0);

    ketInput.getKey('ArrowRight') || direction.x--;
    ketInput.getKey('ArrowLeft') || direction.x++;
    ketInput.getKey('ArrowUp') || direction.y++;
    ketInput.getKey('ArrowDown') || direction.y--;
    return direction.normalized;
  }
}

export class Input {
  constructor(
    public direction: Vec2,
    public isShot: boolean,
    public isSlow: boolean,
    public isBomb: boolean,
    public keyInput: KeyInput
  ) {}
}

class KeyInput {
  constructor(public keyMap: Keymap, public preKeyMap: Keymap) {}
  private _getKeyFromMap(keyName: string, map: Keymap): boolean {
    return map.has(keyName) ? <boolean>map.get(keyName) : false;
  }
  private _getPrevKey(keyName: string): boolean {
    return this._getKeyFromMap(keyName, this.preKeyMap);
  }
  getKey(keyName: string): boolean {
    return this._getKeyFromMap(keyName, this.keyMap);
  }
  getKeyDown(keyName: string): boolean {
    const prevDown = this._getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    return !prevDown && currentDown;
  }
  getKeyUp(keyName: string): boolean {
    const prevDown = this._getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    return prevDown && !currentDown;
  }
}

class KeyInputReceiver {
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

  getInput(): KeyInput {
    const keyMap = new Map(this._keyMap);
    const prevKeyMap = new Map(this._prevKeyMap);
    this._prevKeyMap = new Map(this._keyMap);

    return new KeyInput(keyMap, prevKeyMap);
  }
}
