import { EventDispatcher, GameEvent } from './event/event-dispatcher';
import { Actor } from '../actor';
import { GameInfo } from './info';
import { Input } from './event/input';
import { hitTest } from '../shape/hit-test';

export type updateObj = {
  gameInfo: GameInfo;
  input: Input;
  scene: Scene;
  ctx: CanvasRenderingContext2D;
};

export class Scene extends EventDispatcher<Scene> {
  public actors: Actor[] = [];
  private _destroyedActors: Actor[] = [];

  update(
    gameInfo: GameInfo,
    input: Input,
    ctx: CanvasRenderingContext2D
  ): void {
    this._updateAll(gameInfo, input, this, ctx);
    this._hitTest();
    this._disposeDestroyedActors();
    // this._renderAll(ctx);
  }

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
  private _hitTest(): void {
    const length = this.actors.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        const obj1 = this.actors[i];
        const obj2 = this.actors[j];
        const hit = hitTest.test(obj1.hitBox, obj2.hitBox);
        if (hit) {
          obj1.dispatchEvent('hit', new GameEvent(obj2));
          obj2.dispatchEvent('hit', new GameEvent(obj1));
        }
      }
    }
  }
  private _updateAll(
    gameInfo: GameInfo,
    input: Input,
    scene: Scene,
    ctx: CanvasRenderingContext2D
  ): void {
    this.actors.forEach((actor) =>
      actor.update({ gameInfo, input, scene, ctx })
    );
  }
  /*private _renderAll(ctx: CanvasRenderingContext2D): void {
    this.actors.forEach((obj) => obj.render(ctx));
  }*/
  private _addDestroyedActor(actor: Actor): void {
    this._destroyedActors.push(actor);
  }

  private _disposeDestroyedActors(): void {
    this._destroyedActors.forEach((actor) => this.remove(actor));
    this._destroyedActors = [];
  }
}
