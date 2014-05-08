var SpecialQuestion = cc.Sprite.extend({
    ctor: function() {
        this._super();
       

    },
    show11: function(){
    	this.initWithFile( 'images/special11.png' );
    	this.setPosition( new cc.Point( 370 , 407 ) );
    },
    show18: function(){
    	this.initWithFile( 'images/special18.png' );
    	this.setPosition( new cc.Point( 157 , 427 ) );
    },

    spaceSwap: function(){
    	this.initWithFile( 'images/spacebar1.png' );
		this.movingAction = this.spaceRepeat();
        this.runAction( this.movingAction );
    	 
    },
    spaceRepeat: function(){
		var animation = new cc.Animation.create();
  		animation.addSpriteFrameWithFile( 'images/spacebar1.png');
  		animation.addSpriteFrameWithFile( 'images/spacebar2.png');
  		animation.setDelayPerUnit( 0.3 );
      	return cc.RepeatForever.create( cc.Animate.create( animation ) );
  		

  		 
    }

});
