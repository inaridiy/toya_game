import { EventDispatcher } from '../../base/event/event-dispatcher';

export class Scene extends EventDispatcher {
  constructor() {
    super();
  }
  public actors = [];
  private _destroyedActors = [];
}
