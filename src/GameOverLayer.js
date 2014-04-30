var GameOverLayer = cc.LayerColor.extend({
    ctor: function() {
        this._super();
    },
    onEnter: function() {

        this.setMouseEnabled( true ); 

    },
    
});


var GameOverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameOverLayer();
        this.addChild( layer );
    }
});