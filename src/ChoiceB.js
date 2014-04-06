var ChoiceB = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/answerB.png' );
        
    },

    changePic: function(){
      this.setTexture(cc.TextureCache.getInstance().addImage('images/answerBCircle.png'));
    }
});
