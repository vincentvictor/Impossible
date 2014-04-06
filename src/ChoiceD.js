var ChoiceD = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('images/answerD.png');
	},

	changePic: function(){
      this.setTexture(cc.TextureCache.getInstance().addImage('images/answerDCircle.png'));
    }


});