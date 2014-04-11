var Choice = cc.Sprite.extend({
    ctor: function(choice) {
        this._super();
        this.initWithFile('images/answer' + choice + '.png');
        this.stared = false;
        this.choice = choice;

    },

    changePic: function(){
      this.setTexture(cc.TextureCache.getInstance().addImage('images/answer'+this.choice+'Circle.png'));
    },
    
    mouseMoved: function( position ){
      var box = this.getBoundingBox();
      if(cc.rectContainsPoint(box, position )){
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answer'+this.choice+'Circle.png'));
        } else {
            this.setTexture(cc.TextureCache.getInstance().addImage('images/answer'+this.choice+'.png'));
        }
    }
});


/*function swapImage(id,primary,secondary) {
    src=document.getElementById(id).src;
    if (src.match(primary)) {
      document.getElementById(id).src=secondary;
    } else {
      document.getElementById(id).src=primary;
    }
  }*/