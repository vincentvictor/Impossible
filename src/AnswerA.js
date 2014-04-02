var AnswerA = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/answer1A.png' );
        this.stared = false;

    },

});


/*function swapImage(id,primary,secondary) {
    src=document.getElementById(id).src;
    if (src.match(primary)) {
      document.getElementById(id).src=secondary;
    } else {
      document.getElementById(id).src=primary;
    }
  }*/