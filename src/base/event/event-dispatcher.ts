import { Actor } from '../actor';
import { Scene } from '../game/scene';
import { Rectangle } from '../actor/shape/index';

type cb = (event: GameEvent) => void;
type events = 'spawnactor' | 'destroy' | 'changescene' | 'hit';
type EventTargets = Actor | Scene;

export class EventDispatcher {
  public _eventListeners: { [s: string]: cb[] } = {};

  addEventListener(type: events, callback: cb): void {
    if (this._eventListeners[type] == undefined) {
      this._eventListeners[type] = [];
    }

    this._eventListeners[type].push(callback);
  }
  dispatchEvent(type: events, event: GameEvent): void {
    const listeners = this._eventListeners[type];
    if (listeners != undefined)
      listeners.forEach((callback) => callback(event));
  }
}
export class GameEvent {
  constructor(public target: EventTargets) {}
}

export class GameInfo {
  constructor(public screenRect: Rectangle, public currentScene: Scene) {}
}
