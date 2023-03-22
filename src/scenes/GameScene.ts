import { KEY_CHARSET, KEY_TILED_LEVEL01, KEY_TILESET_FARM, KEY_TILESET_PLATFORMER } from '../global';

export class GameScene extends Phaser.Scene {
  player: Phaser.GameObjects.Sprite;
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

    const platformerTs = map.addTilesetImage('platformer', KEY_TILESET_PLATFORMER);
    const farmTs = map.addTilesetImage('farm', KEY_TILESET_FARM);

    map.createLayer('level0', platformerTs);
    const platform = map.createLayer('level1', platformerTs);
    platform.setCollisionByProperty({ collides: true });

    map.createLayer('level2', farmTs);

    // Create player
    const { x, y } = map
      .getObjectLayer('objects').objects
      .find(({ name }) => name === 'player')
    ;
    this.player = this.add.sprite(x, y, KEY_CHARSET, 0);
    this.physics.add.existing(this.player);
    (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    this.physics.add.collider(this.player, platform);

    // Manage camera
    this.cameras.main
      .setZoom(2)
      .startFollow(this.player)
      .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    ;
  }

  preload(): void {}

  update(): void {
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    if (this.keys.get('LEFT').isDown) {
      body.setVelocityX(-150);
    } else if (this.keys.get('RIGHT').isDown) {
      body.setVelocityX(150);
    } else {
      body.setVelocityX(0);
    }
  }
}
