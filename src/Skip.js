var Skip = cc.Sprite.extend({
    ctor: function( index ) {
        this._super();
       	this.initWithFile( 'images/skip'+index+'.png' );     
    },

    mouseMoved: function( position , index ){
    	var box = this.getBoundingBox();
      	if(cc.rectContainsPoint(box, position )){
            this.setTexture(cc.TextureCache.getInstance().addImage('images/skipBlack.png'));
        } else {
            this.setTexture(cc.TextureCache.getInstance().addImage('images/skip' + index + '.png'));
        }
    }
});