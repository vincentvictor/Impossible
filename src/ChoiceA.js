var ChoiceA = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile('images/answerA.png');
        this.stared = false;

    },

    changePic: function(){
      this.setTexture(cc.TextureCache.getInstance().addImage('images/answerACircle.png'));
    },
    // correct: function(){

    // }



});


/*function swapImage(id,primary,secondary) {
    src=document.getElementById(id).src;
    if (src.match(primary)) {
      document.getElementById(id).src=secondary;
    } else {
      document.getElementById(id).src=primary;
    }
  }*/