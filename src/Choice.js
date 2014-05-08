var Choice = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile('images/answerA.png');
        this.stared = false;
        //this.choice = choice;

    },

    changePic: function(){
      this.setTexture(cc.TextureCache.getInstance().addImage('images/answerACircle.png'));
    },
    
    mouseMoved: function( position ){
      var box = this.getBoundingBox();
      if(cc.rectContainsPoint(box, position )){
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answerACircle.png'));
        } else {
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answerA.png'));
        }
    }
});


