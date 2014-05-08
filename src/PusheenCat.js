var PusheenCat = cc.Sprite.extend({
    ctor: function( index ) {
        this._super();
       
        //this.schedule( this.repeatCat , 0.45 , cc.RepeatForever ,1 );
        if(index==1){
        	this.pusheenGameLayer();
        }
        else if(index==2){
        	this.pusheenIntro();
        }

    },
    pusheenGameLayer: function(){
    	this.initWithFile( 'images/pusheen1.png' );
		this.movingAction = this.repeatCat();
        this.runAction( this.movingAction );
        this.schedule( this.rotatePusheenCat,0 );
    },

    repeatCat: function(){
  		var animation = new cc.Animation.create();
  		// animation.setDelayPerUnit(0.1);
  		// animation.setLoops(1);
  		animation.addSpriteFrameWithFile( 'images/pusheen1.png');
  		animation.addSpriteFrameWithFile( 'images/pusheen2.png');
  		animation.addSpriteFrameWithFile( 'images/pusheen3.png');
  		animation.addSpriteFrameWithFile( 'images/pusheen4.png');
  		animation.addSpriteFrameWithFile( 'images/pusheen5.png');
  		animation.addSpriteFrameWithFile( 'images/pusheen6.png');
  		animation.addSpriteFrameWithFile( 'images/pusheen7.png');
  		animation.addSpriteFrameWithFile( 'images/pusheen8.png');
  		animation.setDelayPerUnit( 0.1 );
      	return cc.RepeatForever.create( cc.Animate.create( animation ) );

  		// var movingAction = cc.Animate.create( animation );
  		// return this.runAction( movingAction );
  	},

  	rotatePusheenCat: function() {
        var angle = this.getRotation();
        var turnSpeed = -5;
        this.setRotation( angle + turnSpeed );
    },

    pusheenIntro: function(){
    	this.initWithFile( 'images/pusheenIntro1.png' );
		this.movingAction = this.repeatCatIntro();
        this.runAction( this.movingAction );
    },
    repeatCatIntro: function(){
    	var animation = new cc.Animation.create();
    	animation.addSpriteFrameWithFile( 'images/pusheenIntro2.png');
    	animation.addSpriteFrameWithFile( 'images/pusheenIntro3.png');
    	animation.addSpriteFrameWithFile( 'images/pusheenIntro4.png');
    	animation.setDelayPerUnit( 0.1 );
      	return cc.RepeatForever.create( cc.Animate.create( animation ) );
    }

});