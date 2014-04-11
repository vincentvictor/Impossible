var ChoiceD = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('images/answerD.png');
	},

	changePic: function(){
      this.setTexture(cc.TextureCache.getInstance().addImage('images/answerDCircle.png'));
    },

    mouseMoved: function( position ){
      var box = this.getBoundingBox();
      if(cc.rectContainsPoint(box, position )){
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answerDCircle.png'));
        } else {
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answerD.png'));
        }
    }


});