var GameOver = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/gameOverBG1.png' );
        this.schedule( this.repeatGameOver , 1 , cc.RepeatForever , 1 );
    },

    repeatGameOver: function(){
  		var animation = new cc.Animation.create();
  		animation.setDelayPerUnit(0.1);
  		animation.setLoops(5);
  		animation.addSpriteFrameWithFile( 'images/gameOverBG1.png');
  		animation.addSpriteFrameWithFile( 'images/gameOverBG2.png');


  		var movingAction = cc.Animate.create( animation );
  		return this.runAction( movingAction );
  	},

});
