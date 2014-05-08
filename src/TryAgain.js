var TryAgain = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile('images/tryAgain.png');
    },

    position: function( i ){
    	this.setTexture(cc.TextureCache.getInstance().addImage('images/tryAgain.png'));
    	if(i==0)
    		this.setPosition( new cc.Point( 600 , 100 ));
    	else if( i==1 )
    		this.setPosition( new cc.Point( 400 , 200 ));
    	else if( i==2 )
    		this.setPosition( new cc.Point( 500 , 200 ));

    	
    },


    mouseMoved: function( position , index ){
    	var box = this.getBoundingBox();
      	if(cc.rectContainsPoint(box, position )){
            this.setTexture(cc.TextureCache.getInstance().addImage('images/tryAgainClick.png'));
        } else {
            this.setTexture(cc.TextureCache.getInstance().addImage('images/tryAgain.png'));
        }
    },
});