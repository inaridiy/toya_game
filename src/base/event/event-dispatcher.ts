import { Scene } from '../game/scene';
import { Rectangle } from '../actor/shape/index';

type cb<T> = (event: GameEvent<T>) => void;
type sceneEvents = 'changescene';
type actorEvents = 'spawnactor' | 'destroy' | 'hit';

export class EventDispatcher<T> {
  public _eventListeners: { [t in sceneEvents | actorEvents]: cb<T>[] } = {
    changescene: [],
    spawnactor: [],
    destroy: [],
    hit: [],
  };

  addEventListener(type: sceneEvents | actorEvents, callback: cb<T>): void {
    this._eventListeners[type].push(callback);
  }
  dispatchEvent(type: sceneEvents | actorEvents, event: GameEvent<T>): void {
    const listeners = this._eventListeners[type];
    if (listeners != undefined)
      listeners.forEach((callback) => callback(event));
  }
}
export class GameEvent<T> {
  constructor(public target: T) {}
}

export class GameInfo {
  constructor(
    public screenRect: Rectangle,
    public currentScene: Scene,
    public count: number
  ) {}
}
