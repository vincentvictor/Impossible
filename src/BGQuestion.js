var BGQuestion = cc.Sprite.extend({
    ctor: function( state ) {
        this._super();
        //this.initWithFile( 'images/'+state+'.png' );
        this.initWithFile( 'images/background0.png' );
    },

    changePic: function( currentStage ){
    	this.setTexture(cc.TextureCache.getInstance().addImage('images/background'+currentStage+'.png'));
    }

});

