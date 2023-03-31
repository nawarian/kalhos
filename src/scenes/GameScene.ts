import {
  ANIM_PLAYER_IDLE,
  ANIM_PLAYER_WALK_LEFT,
  ANIM_PLAYER_WALK_RIGHT,
  DEPTH_LEVELS,
  KEY_TILED_LEVEL01,
  KEY_TILESET_FARM,
  KEY_TILESET_PLATFORMER,
} from '../global';
import Coin from '../objects/Coin';
import Player from '../objects/Player';
import MobileControlsScene, {
  EVENT_PLAYER_DROP_COIN,
  EVENT_PLAYER_MOVE_END,
  EVENT_PLAYER_MOVE_START,
  KEY_MOBILE_CONTROLS_SCENE,
} from './MobileControlsScene';

export class GameScene extends Phaser.Scene {
  player: Player;

  coins: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

  create(): void {
    // Control
    const controls = this.scene.get(
      KEY_MOBILE_CONTROLS_SCENE,
    ) as MobileControlsScene;
    controls.setParent(this);
    this.scene.launch(controls);

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

    this.events.on(
      EVENT_PLAYER_MOVE_START,
      this.handlePlayerMoveStart.bind(this),
    );
    this.events.on(EVENT_PLAYER_MOVE_END, this.handlePlayerMoveEnd.bind(this));
    this.events.on(
      EVENT_PLAYER_DROP_COIN,
      this.handlePlayerDropCoin.bind(this),
    );
  }

  preload(): void {}

  update(): void {
    if (Phaser.Input.Keyboard.JustUp(this.input.keyboard.addKey('DOWN'))) {
      this.player.dropCoin(this.coins);
    }
  }

  handlePlayerMoveStart(direction: 'left' | 'right') {
    const flipFactor = direction === 'left' ? -1 : 1;
    const animation =
      direction === 'left' ? ANIM_PLAYER_WALK_LEFT : ANIM_PLAYER_WALK_RIGHT;
    this.player.play(animation, true);
    this.player.getBody().setVelocityX(150 * flipFactor);
  }

  handlePlayerMoveEnd(direction: 'left' | 'right') {
    this.player.play(ANIM_PLAYER_IDLE);
    this.player.getBody().setVelocityX(0);
  }

  handlePlayerDropCoin() {
    this.player.dropCoin(this.coins);
  }
}
