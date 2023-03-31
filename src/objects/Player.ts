import { ANIM_PLAYER_IDLE, DEPTH_LEVELS, KEY_CHARSET } from '../global';
import { EVENT_PLAYER_DROP_COIN } from '../scenes/MobileControlsScene';
import Coin from './Coin';

export default class Player extends Phaser.GameObjects.Sprite {
  coins: number = 20;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, KEY_CHARSET, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.getBody()
      .setCollideWorldBounds(true)
      .setSize(10, 20)
      .setOffset(27, 22);

    this.setDepth(DEPTH_LEVELS.player).play(ANIM_PLAYER_IDLE).setInteractive();
    this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
      this.scene.events.emit(EVENT_PLAYER_DROP_COIN),
    );
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  onCollectCoin(coin: Coin) {
    if (coin.canBeCollected) {
      this.coins++;
      coin.destroy();
    }
  }

  dropCoin(coins: Phaser.GameObjects.Group): void {
    if (this.coins > 0) {
      this.coins--;
      coins.getFirstDead(true, this.x, this.y - 20);
    }
  }
}
