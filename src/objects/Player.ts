import {
  ANIM_PLAYER_IDLE,
  ANIM_PLAYER_WALK_LEFT,
  ANIM_PLAYER_WALK_RIGHT,
  DEPTH_LEVELS,
  KEY_CHARSET,
} from '../global';
import Coin from './Coin';

export default class Player extends Phaser.GameObjects.Sprite {
  coins: number = 0;
  keys: Map<string, Phaser.Input.Keyboard.Key>;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, KEY_CHARSET, 0);

    this.keys = new Map([
      ['LEFT', scene.input.keyboard.addKey('LEFT')],
      ['RIGHT', scene.input.keyboard.addKey('RIGHT')],
      ['ACTION', scene.input.keyboard.addKey('DOWN')],
    ]);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.getBody()
      .setCollideWorldBounds(true)
      .setSize(10, 20)
      .setOffset(27, 22);

    this.setDepth(DEPTH_LEVELS.player).play(ANIM_PLAYER_IDLE);
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  onCollectCoin(coin: Coin) {
    this.coins++;
    coin.destroy();
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    // Movement
    const body = this.getBody();

    if (this.keys.get('LEFT').isDown) {
      body.setVelocityX(-150);
      this.play(ANIM_PLAYER_WALK_LEFT, true);
    } else if (this.keys.get('RIGHT').isDown) {
      body.setVelocityX(150);
      this.play(ANIM_PLAYER_WALK_RIGHT, true);
    } else {
      body.setVelocityX(0);
      this.play(ANIM_PLAYER_IDLE);
    }
  }
}
