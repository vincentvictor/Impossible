var ChoiceC = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('images/answerC.png');
	},
	changePic: function(){
      this.setTexture(cc.TextureCache.getInstance().addImage('images/answerCCircle.png'));
    }


});