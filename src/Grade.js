var Grade = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/grade0.png' );
    },

    changePic: function( currentStage ) {
    	this.setTexture(cc.TextureCache.getInstance().addImage('images/grade'+currentStage+'.png'));
    }

});
