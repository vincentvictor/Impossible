var NyanCat = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/nyancat1.png' );
        this.schedule( this.repeatCat , 1 , cc.RepeatForever , 1 );

    },

  	repeatCat: function(){
  		var animation = new cc.Animation.create();
  		animation.setDelayPerUnit(0.1);
  		animation.setLoops(5);
  		animation.addSpriteFrameWithFile( 'images/nyancat1.png');
  		animation.addSpriteFrameWithFile( 'images/nyancat2.png');
  		animation.addSpriteFrameWithFile( 'images/nyancat3.png');
  		animation.addSpriteFrameWithFile( 'images/nyancat4.png');
  		animation.addSpriteFrameWithFile( 'images/nyancat5.png');

  		var movingAction = cc.Animate.create( animation );
  		return this.runAction( movingAction );
  	},

  	changePosition: function( gradeScore ){
  		if( gradeScore==1 ){
  			this.setPosition( new cc.Point( 570 , 550 ));
  		}
  		else if( gradeScore==2 ){
  			this.setPosition( new cc.Point( 590 , 550 ));
  		}
  	}


});

