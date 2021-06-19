import { SpriteActor } from './base/actor';
const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
const i = new Image();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

i.src = '/static/img/生首.png';
i.onload = () => {
  const actor = new SpriteActor(50, 90, 3, [], i, 40);
  let moveFlag = '';
  addEventListener('keydown', (e) => {
    moveFlag = e.key;
  });
  addEventListener('keyup', (e) => {
    if (e.key === moveFlag) {
      moveFlag = '';
    }
  });

  (function loop() {
    if (moveFlag === 'ArrowRight') {
      actor.x += 3;
    } else if (moveFlag === 'ArrowLeft') {
      actor.x -= 3;
    } else if (moveFlag === 'ArrowUp') {
      actor.y -= 3;
    } else if (moveFlag === 'ArrowDown') {
      actor.y += 3;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actor.render(ctx);

    requestAnimationFrame(loop);
  })();
};

console.log('hi');
