import { DEPTH_LEVELS, KEY_CHARSET } from '../global';
import Coin from './Coin';

export default class Player extends Phaser.GameObjects.Sprite {
  coins: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, KEY_CHARSET, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.getBody().setCollideWorldBounds(true);

    this.setDepth(DEPTH_LEVELS.player);
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  onCollectCoin(coin: Coin) {
    this.coins++;
    coin.destroy();
  }
}
