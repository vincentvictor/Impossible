var BGQuestion = cc.Sprite.extend({
    ctor: function( state ) {
        this._super();
        
    },

    startQuestion1:function () {
    	this.initWithFile( 'images/background0.png' );
    },

  

    changePic: function( currentStage ){
    	this.setTexture(cc.TextureCache.getInstance().addImage('images/background'+currentStage+'.png'));
    },


    //===============================================================================

    startIntro: function(){
		this.initWithFile( 'images/intro.png' );
    },
});

