import {
  DEPTH_LEVELS,
  KEY_TILED_LEVEL01,
  KEY_TILESET_FARM,
  KEY_TILESET_PLATFORMER,
} from '../global';
import Coin from '../objects/Coin';
import Player from '../objects/Player';

export class GameScene extends Phaser.Scene {
  player: Player;

  coins: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

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

    // Add coins
    this.coins = this.make.group({
      classType: Coin,
      runChildUpdate: true,
    });
    map
      .getObjectLayer('objects')
      .objects.filter(({ name }) => name === 'coin')
      .forEach(({ x, y }) => this.coins.getFirstDead(true, x, y));
    this.physics.add.collider(this.coins, platform);

    // Create player
    const { x, y } = map
      .getObjectLayer('objects')
      .objects.find(({ name }) => name === 'player');

    this.player = new Player(this, x, y);
    this.physics.add.collider(this.player, platform);
    this.physics.add.overlap(this.player, this.coins, (p, c) =>
      (p as Player).onCollectCoin(c as Coin),
    );

    // Manage camera
    this.cameras.main
      .setZoom(2)
      .startFollow(this.player)
      .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      .setRoundPixels(true);
  }

  preload(): void {}

  update(): void {
    if (Phaser.Input.Keyboard.JustUp(this.input.keyboard.addKey('DOWN'))) {
      this.player.dropCoin(this.coins);
    }
  }
}
