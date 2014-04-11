var ChoiceB = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/answerB.png' );
        
    },

    changePic: function(){
      this.setTexture(cc.TextureCache.getInstance().addImage('images/answerBCircle.png'));
    },

    mouseMoved: function( position ){
      var box = this.getBoundingBox();
      if(cc.rectContainsPoint(box, position )){
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answerBCircle.png'));
        } else {
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answerB.png'));
        }
    }
});
