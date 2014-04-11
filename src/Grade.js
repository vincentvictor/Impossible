var Grade = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/grade0.png' );
    },

    changePic: function( gradeScore ) {
    	if(gradeScore>4) { console.log(" GAME OVER "); }
    	else {
    		this.setTexture(cc.TextureCache.getInstance().addImage('images/grade'+gradeScore+'.png'));
   		}
    }

});
