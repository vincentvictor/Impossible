var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        //this.currentStage = 0;
        //this.startState("background");
        var currentStage;
        this.currentStage = 0;
        this.startState( currentStage );         

        this.setMouseEnabled( true );        
        return true;
    },

    // toNextStage: function() {   
    //     this.currentState++;
    //     this.startState( this.currentState );
    // },

    startState: function( state ) {
        this.bgQuestion = new BGQuestion( state );
        this.bgQuestion.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.bgQuestion ); 

        //combine with bg
        // this.gradePic = new Grade();
        // this.gradePic.setPosition( new cc.Point( 620 , 546 ));
        // this.addChild( this.gradePic );

        this.grade = new Grade();
        this.grade.setPosition( new cc.Point( 620 , 537 ));
        this.addChild( this.grade );

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

        this.next = new Next();
        this.next.setPosition( new cc.Point( 250 , 550 ));
        this.addChild( this.next );
    },

    onMouseDown: function( e ){
        var button = this.getClickedButton(e);
        if( button === 0 ){
            this.choiceA.changePic();
            this.checkRightAnswer( button );
            console.log("CLICK ANSWER A");
        } else if( button === 1 ){
            this.choiceB.changePic();
            this.checkRightAnswer( button );
            console.log("CLICK ANSWER B");
        } else if( button === 2 ){
            this.choiceC.changePic();
            this.checkRightAnswer( button );
            console.log("CLICK ANSWER C");
        } else if( button === 3 ){
            this.choiceD.changePic();
            this.checkRightAnswer( button );
            console.log("CLICK ANSWER D");
        } 
        else if( button === 10){
            console.log("nextnext");
            this.bgQuestion.changePic( this.currentStage );
        }
        else {
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

        var nextButton = this.next;
        var boxx = this.next.getBoundingBox();
        if(cc.rectContainsPoint(boxx, point)){
            return 10;
        }

    },
    // getClickNext: function( e ){ // skip
    //     var point = e.getLocation();
    //     var box = this.next.getBoundingBox();
    //     if(cc.rectContainsPoint(box, point)){
    //         return 100;
    //     }
    // },

    checkRightAnswer: function ( button ){
        var answers = [0,1,2,3]; // answer of question 1-4
            
        if(button === answers[this.currentStage]){
            this.currentStage++;
            console.log(this.currentStage);
            console.log("Right");
        }
        else {
            this.currentStage++;
            this.grade.changePic( this.currentStage );
            console.log("Wrong");
        }
        
    },

    // clearChoice: function(){
    //     choiceA.setTexture(cc.TextureCache.getInstance().addImage('images/answerA.png'));
    // }


});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});


