import {
  ANIM_COIN_SPIN,
  ANIM_PLAYER_IDLE,
  ANIM_PLAYER_WALK_LEFT,
  ANIM_PLAYER_WALK_RIGHT,
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
      },
    );
    this.load.image(KEY_TILESET_FARM, 'assets/farm-tilemap_packed.png');
    this.load.tilemapTiledJSON(KEY_TILED_LEVEL01, 'maps/level01.json');

    this.load.spritesheet(
      KEY_CHARSET,
      'assets/charset-char_a_p1_0bas_humn_v01.png',
      {
        frameWidth: 64,
        frameHeight: 64,
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

    this.anims.create({
      key: ANIM_PLAYER_IDLE,
      frames: this.anims.generateFrameNames(KEY_CHARSET, {
        frames: [0],
      }),
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: ANIM_PLAYER_WALK_LEFT,
      frames: this.anims.generateFrameNames(KEY_CHARSET, {
        frames: [56, 57, 58, 59, 60, 61],
      }),
      repeat: 0,
      frameRate: 10,
    });

    this.anims.create({
      key: ANIM_PLAYER_WALK_RIGHT,
      frames: this.anims.generateFrameNames(KEY_CHARSET, {
        frames: [48, 49, 50, 51, 52, 53],
      }),
      repeat: 0,
      frameRate: 10,
    });
  }

  update(): void {
    this.scene.start('GameScene');
  }
}
