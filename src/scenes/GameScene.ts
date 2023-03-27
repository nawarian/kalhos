import {
  DEPTH_LEVELS,
  KEY_TILED_LEVEL01,
  KEY_TILESET_FARM,
  KEY_TILESET_PLATFORMER,
} from '../global';
import Player from '../objects/Player';

export class GameScene extends Phaser.Scene {
  player: Player;
  keys: Map<string, Phaser.Input.Keyboard.Key>;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {
    this.keys = new Map([
      ['LEFT', this.input.keyboard.addKey('LEFT')],
      ['RIGHT', this.input.keyboard.addKey('RIGHT')],
      ['ACTION', this.input.keyboard.addKey('DOWN')],
    ]);
  }

  create(): void {
    // Set up tiled map
    const map = this.add.tilemap(KEY_TILED_LEVEL01);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    const platformerTs = map.addTilesetImage(
      'platformer',
      KEY_TILESET_PLATFORMER,
    );
    const farmTs = map.addTilesetImage('farm', KEY_TILESET_FARM);

    map.createLayer('level0', platformerTs).setDepth(DEPTH_LEVELS.background);
    const platform = map.createLayer('level1', platformerTs);
    platform
      .setCollisionByProperty({ collides: true })
      .setDepth(DEPTH_LEVELS.floor);

    map.createLayer('level2', farmTs).setDepth(DEPTH_LEVELS.floor);
    map.createLayer('level3', platformerTs).setDepth(DEPTH_LEVELS.trees);

    // Create player
    const { x, y } = map
      .getObjectLayer('objects')
      .objects.find(({ name }) => name === 'player');

    this.player = new Player(this, x, y);
    this.physics.add.collider(this.player, platform);

    // Manage camera
    this.cameras.main
      .setZoom(2)
      .startFollow(this.player)
      .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      .setRoundPixels(true);
  }

  preload(): void {}

  update(): void {
    const body = this.player.getBody();

    if (this.keys.get('LEFT').isDown) {
      body.setVelocityX(-150);
    } else if (this.keys.get('RIGHT').isDown) {
      body.setVelocityX(150);
    } else {
      body.setVelocityX(0);
    }
  }
}
