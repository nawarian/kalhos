import { ANIM_COIN_SPIN, KEY_TILESET_PLATFORMER_SPR } from '../global';

export default class Coin extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, KEY_TILESET_PLATFORMER_SPR, 151);

    scene.physics.add.existing(this);

    this.setPosition(x - this.width / 2, y - this.height / 2).play(
      ANIM_COIN_SPIN,
      true,
    );

    this.getBody().setBounce(0.4, 0.5).setSize(10, 10);
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}
