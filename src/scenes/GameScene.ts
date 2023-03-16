import { KEY_TILESET_PLATFORMER } from '../global';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

  create(): void {
    this.add.image(0, 0, KEY_TILESET_PLATFORMER).setOrigin(0, 0);
  }

  preload(): void {}

  update(): void {}
}
