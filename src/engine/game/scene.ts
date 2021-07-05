import { EventDispatcher, GameEvent } from '../event/event-dispatcher';
import { Actor } from '../actor';

export class Scene extends EventDispatcher<Scene> {
  public actors: Actor[] = [];
  private _destroyedActors: Actor[] = [];

  add(actor: Actor): void {
    this.actors.push(actor);
    actor.addEventListener('spawnactor', (e) => this.add(e.target));
    actor.addEventListener('destroy', (e) => this._addDestroyedActor(e.target));
  }
  remove(actor: Actor): void {
    const index = this.actors.indexOf(actor);
    this.actors.splice(index, 1);
  }
  changeScene(newScene: Scene): void {
    const event = new GameEvent(newScene);
    this.dispatchEvent('changescene', event);
  }

  private _renderAll(ctx: CanvasRenderingContext2D): void {
    this.actors.forEach((obj) => obj.render(ctx));
  }
  private _addDestroyedActor(actor: Actor): void {
    this._destroyedActors.push(actor);
  }

  private _disposeDestroyedActors(): void {
    this._destroyedActors.forEach((actor) => this.remove(actor));
    this._destroyedActors = [];
  }
}
