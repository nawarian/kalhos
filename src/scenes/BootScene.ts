import {
  KEY_CHARSET,
  KEY_TILED_LEVEL01,
  KEY_TILESET_FARM,
  KEY_TILESET_PLATFORMER,
} from '../global';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.load.image(
      KEY_TILESET_PLATFORMER,
      'assets/platformer-tiles_packed.png',
    );
    this.load.image(KEY_TILESET_FARM, 'assets/farm-tilemap_packed.png');
    this.load.tilemapTiledJSON(KEY_TILED_LEVEL01, 'maps/level01.json');

    this.load.spritesheet(
      KEY_CHARSET,
      'assets/platformer-characters_packed.png',
      {
        frameWidth: 24,
        frameHeight: 24,
      },
    );
  }

  update(): void {
    this.scene.start('GameScene');
  }
}
