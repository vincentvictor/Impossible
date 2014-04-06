var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        //this.currentStage = 0;
        //this.startState("background");
        var currentStage = 0;
        this.startState( currentStage );         

        this.setMouseEnabled( true );        
        return true;
    },

    // toNextStage: function() {   
    //     this.currentState++;
    //     this.startState( this.currentState );
    // },

    startState: function( state ) {
        this.backgroundd = new Background( state );
        this.backgroundd.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.backgroundd ); 

        this.gradePic = new Grade();
        this.gradePic.setPosition( new cc.Point( 620 , 546 ));
        this.addChild( this.gradePic );

        this.choiceA = new ChoiceA();
        this.choiceA.setPosition( new cc.Point( 170, 238 ) );
        this.addChild( this.choiceA );

        this.choiceB = new ChoiceB();
        this.choiceB.setPosition( new cc.Point( 500, 237 ) );
        this.addChild( this.choiceB );

        this.choiceC = new ChoiceC();
        this.choiceC.setPosition( new cc.Point( 170, 103 ) );
        this.addChild( this.choiceC );

        this.choiceD = new ChoiceD();
        this.choiceD.setPosition( new cc.Point( 500, 103 ) );
        this.addChild( this.choiceD );

        this.question0 = new Question0();
        this.question0.setPosition( new cc.Point( 450, 388 ) );
        this.addChild( this.question0 ); 

    },

    checkRightAnswer: function ( e ){

    },

    onMouseDown: function( e ){
        var answers = [0,1,2,3]; // answer of question 1-4
        var button = this.getClickedButton(e);
        if( button === 0 ){
            this.choiceA.changePic();
            if(button === answers[0]){
                console.log("Right");
            }
            else {
                console.log("wrong");
            }
            console.log("CLICK ANSWER A");
        } else if( button === 1 ){
            this.choiceB.changePic();
            console.log("CLICK ANSWER B");
        } else if( button === 2 ){
            this.choiceC.changePic();
            console.log("CLICK ANSWER C");
        } else if( button === 3 ){
            this.choiceD.changePic();
            console.log("CLICK ANSWER D");
        } else {
            console.log("SOMEWHERE");
        }
    },

    getClickedButton: function( e ){
        var choices = [this.choiceA, this.choiceB, this.choiceC, this.choiceD];
        var point = e.getLocation();

        for(var i = 0; i < choices.length; i++){
            var box = choices[i].getBoundingBox();
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


