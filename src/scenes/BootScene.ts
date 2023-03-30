import {
  ANIM_COIN_SPIN,
  KEY_CHARSET,
  KEY_TILED_LEVEL01,
  KEY_TILESET_FARM,
  KEY_TILESET_PLATFORMER,
  KEY_TILESET_PLATFORMER_SPR,
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
    this.load.spritesheet(
      KEY_TILESET_PLATFORMER_SPR,
      'assets/platformer-tiles_packed.png',
      {
        frameWidth: 18,
        frameHeight: 18,
      }
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

  create() {
    this.anims.create({
      key: ANIM_COIN_SPIN,
      frames: this.anims.generateFrameNumbers(KEY_TILESET_PLATFORMER_SPR, {
        frames: [151, 152],
      }),
      repeat: -1,
      frameRate: 4,
    });
  }

  update(): void {
    this.scene.start('GameScene');
  }
}
