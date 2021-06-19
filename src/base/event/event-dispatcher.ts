import { Actor } from '../../../oldsrc/base/actor';
type cb = (event: GameEvent) => void;

export class EventDispatcher {
  public _eventListeners: { [s: string]: cb[] } = {};

  addEventListener(type: string, callback: cb): void {
    if (this._eventListeners[type] == undefined) {
      this._eventListeners[type] = [];
    }

    this._eventListeners[type].push(callback);
  }
  dispatchEvent(type: string, event: GameEvent): void {
    const listeners = this._eventListeners[type];
    if (listeners != undefined)
      listeners.forEach((callback) => callback(event));
  }
}
export class GameEvent {
  constructor(public target: Actor) {}
}
