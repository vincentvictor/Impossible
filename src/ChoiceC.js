var ChoiceC = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('images/answerC.png');
	},

	changePic: function(){
      this.setTexture(cc.TextureCache.getInstance().addImage('images/answerCCircle.png'));
    },

    mouseMoved: function( position ){
      var box = this.getBoundingBox();
      if(cc.rectContainsPoint(box, position )){
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answerCCircle.png'));
        } else {
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answerC.png'));
        }
    }


});