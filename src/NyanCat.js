var NyanCat = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/nyancat1.png' );
        this.movingAction = this.repeatCat();
        this.runAction( this.movingAction );

    },

  	repeatCat: function(){
      var animation = new cc.Animation.create();
      animation.addSpriteFrameWithFile( 'images/nyancat1.png');
      animation.addSpriteFrameWithFile( 'images/nyancat2.png');
      animation.addSpriteFrameWithFile( 'images/nyancat3.png');
      animation.addSpriteFrameWithFile( 'images/nyancat4.png');
      animation.addSpriteFrameWithFile( 'images/nyancat5.png');
      animation.setDelayPerUnit( 0.1 );
      return cc.RepeatForever.create( cc.Animate.create( animation ) );
  	},

  	changePosition: function( gradeScore ){
  		if( gradeScore==1 ){
  			this.setPosition( new cc.Point( 170 , 550 ));
  		}
  		else if( gradeScore==2 ){
  			this.setPosition( new cc.Point( 240 , 550 ));
  		}
      else if( gradeScore==3 ){
        this.setPosition( new cc.Point( 310 , 550 ));
      }
      else if( gradeScore==4 ){
        this.setPosition( new cc.Point( 380 , 550 ));
      }
      else if( gradeScore==5 ){
        this.setPosition( new cc.Point( 450 , 550 ));
      }
      else if( gradeScore==6 ){
        this.setPosition( new cc.Point( 550 , 550 ));
      }
  	},


});

