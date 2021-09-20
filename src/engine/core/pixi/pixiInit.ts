import { Application } from 'pixi.js';
import { engineConf } from '../../../const';

export const app = new Application({
  width: innerWidth,
  height: innerHeight,
  backgroundColor: 0x1099bb,
});
const wrapper = document.getElementById(engineConf.wrapperId) || document.body;
wrapper.appendChild(app.view);

window.addEventListener('resize', () => {
  app.resizeTo = wrapper;
  app.resize();
});
