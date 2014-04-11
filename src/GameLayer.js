var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        var currentStage;
        this.currentStage = 0;
        this.startState( currentStage );  

        // F D  C  B  A
        var gradeScore;
        this.gradeScore = 0;     

        this.scheduleUpdate();
        this.setMouseEnabled( true );        
        return true;
    },

    // toNextStage: function() {   
    //     this.currentState++;
    //     this.startState( this.currentState );
    // },

    startState: function( state ) {
        this.bgQuestion = new BGQuestion( state );
        this.bgQuestion.setPosition( new cc.Point( 400 , 300 ));
        this.addChild( this.bgQuestion ); 

        this.skips = new Array();
        for(var i=0 ; i<5 ; i++){
            this.skips[i] = new Skip( i );
            this.skips[i].setPosition(new cc.Point( 200 + (50 * i) , 550));
            this.addChild( this.skips[i] );
        }

        this.grade = new Grade();
        this.grade.setPosition( new cc.Point( 620 , 537 ));
        this.addChild( this.grade );

        this.choiceA = new Choice("A");
        this.choiceA.setPosition( new cc.Point( 170, 238 ) );
        this.addChild( this.choiceA );

        this.choiceB = new Choice("B");
        this.choiceB.setPosition( new cc.Point( 500, 237 ) );
        this.addChild( this.choiceB );

        this.choiceC = new Choice("C");
        this.choiceC.setPosition( new cc.Point( 170, 103 ) );
        this.addChild( this.choiceC );

        this.choiceD = new Choice("D");
        this.choiceD.setPosition( new cc.Point( 500, 103 ) );
        this.addChild( this.choiceD );

        
    },

    onMouseDown: function( e ){
        var position = e.getLocation();
        var button = this.getClickedButton( position );
        if( button === 0 ){
            this.choiceA.changePic();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER A" );
        } else if( button === 1 ){
            this.choiceB.changePic();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER B" );
        } else if( button === 2 ){
            this.choiceC.changePic();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER C" );
        } else if( button === 3 ){
            this.choiceD.changePic();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER D" );
        } 
        else {
            console.log( "SOMEWHERE" );
        }
    },


    onMouseMoved: function( e ){
        var position = e.getLocation();
        this.choiceA.mouseMoved( position );
        this.choiceB.mouseMoved( position );
        this.choiceC.mouseMoved( position );
        this.choiceD.mouseMoved( position );

        for (var i = 0; i < 5; i++)
            this.skips[i].mouseMoved( position , i);
        
    },

    getClickedButton: function( position ){
        var choices = [this.choiceA, this.choiceB, this.choiceC, this.choiceD];
       // var point = e.getLocation();

        for(var i = 0; i < choices.length; i++){
            var box = choices[i].getBoundingBox();
            if(cc.rectContainsPoint( box , position )){
                return i;
            }
        }
    },
   
    checkRightAnswer: function ( button ){
        var answers = [0,1,2,3,0,1,2,3,0,1]; // answer of question 1-10
            
        if(button === answers[this.currentStage]){
            this.currentStage++;
            this.bgQuestion.changePic( this.currentStage );
            console.log( "This current stage = " + this.currentStage );
            console.log( "Right" );
        }
        else {
            this.currentStage++;
            this.gradeScore++;
            this.bgQuestion.changePic( this.currentStage );
            this.grade.changePic( this.gradeScore );
            console.log( "Wrong" );
        }
        
    },


});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});


