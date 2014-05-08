var Rainbow = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/nyanRainbow2.png' );
		this.movingAction = this.repeatRainbow();
        this.runAction( this.movingAction );
    },

    repeatRainbow: function(){
      var animation = new cc.Animation.create();
 
      animation.addSpriteFrameWithFile( 'images/nyanRainbow3.png');
      animation.addSpriteFrameWithFile( 'images/nyanRainbow1.png');
      animation.addSpriteFrameWithFile( 'images/nyanRainbow2.png');
    
      animation.setDelayPerUnit( 0.09 );
      return cc.RepeatForever.create( cc.Animate.create( animation ) );
  	},

});