var Intro = cc.LayerColor.extend({
    init: function() {

        this._super( new cc.Color4B( 255, 255, 255, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.bgIntro = new BGQuestion(  );
        this.bgIntro.setPosition( new cc.Point( 400 , 300 ));
        this.addChild( this.bgIntro ); 
        this.bgIntro.startIntro();

        this.pusheenInt = new PusheenCat(2);
        this.pusheenInt.setPosition( new cc.Point( 630 , 290 ));
        this.addChild( this.pusheenInt );

        this.space = new SpecialQuestion();
        this.space.setPosition( new cc.Point( 400 , 150 ));
        this.addChild(this.space,3);
        this.space.spaceSwap();

        cc.AudioEngine.getInstance().playMusic( 'sound/IntroTokyo.mp3', true );

        this.setKeyboardEnabled( true );
        this.setMouseEnabled( true ); 



        return true;
    },

    onKeyDown: function(e){
        if(e==32){
            cc.AudioEngine.getInstance().playMusic( 'sound/nyancat.mp3', true );
            this.callStartScene();
        }
    },

    callStartScene: function(){
        var director = cc.Director.getInstance();
        director.replaceScene(cc.TransitionFade.create( 5 ,new StartScene()));
    },

   
});

var IntroScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new Intro();
        layer.init();
        this.addChild( layer );
    }
});
