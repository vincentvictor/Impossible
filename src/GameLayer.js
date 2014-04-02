var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.backgroundd = new Background();
        this.backgroundd.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.backgroundd ); 

        this.gradePic = new Grade();
        this.gradePic.setPosition( new cc.Point(620 , 546 ));
        this.addChild( this.gradePic );

        this.answerA = new AnswerA();
        this.answerA.setPosition( new cc.Point( 270, 242 ) );
        this.addChild( this.answerA );

        this.answerB = new AnswerB();
        this.answerB.setPosition( new cc.Point( 600, 242 ) );
        this.addChild( this.answerB );

        this.answerC = new AnswerC();
        this.answerC.setPosition( new cc.Point( 270, 109 ) );
        this.addChild( this.answerC );

        this.answerD = new AnswerD();
        this.answerD.setPosition( new cc.Point( 600, 109 ) );
        this.addChild( this.answerD );

        this.question0 = new Question0();
        this.question0.setPosition( new cc.Point( 450, 388 ) );
        this.addChild( this.question0 ); 


        //this.setKeyboardEnabled( true );
        this.setMouseEnabled( true );        

        return true;
    },
    onMouseDown: function( e ){
        var button = this.getClickedButton(e);
        if(button === 0){
            console.log("YESSSS");
        }else if(button === 1 || button === 2 || button === 3){
            console.log("NOOOO");
        }
    },

    getClickedButton: function(e){
        var answers = [this.answerA, this.answerB, this.answerC, this.answerD];
        var point = e.getLocation();

        for(var i = 0; i < answers.length; i++){
            var box = answers[i].getBoundingBox();
            if(cc.rectContainsPoint(box, point)){
                return i;
            }
        }
    }

    

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});


