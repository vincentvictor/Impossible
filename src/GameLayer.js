var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        var currentStage;
        this.currentStage = 0;
        this.startState( currentStage );  

        var gradeScore;
        this.gradeScore = 0;   

        var clickedSkip;
        this.clickedSkip = new Array();
        for(var i=0 ; i<5 ; i++){
            this.clickedSkip[i] = false;
        }   

       
        this.scheduleUpdate();
        this.setMouseEnabled( true ); 

        this.schedule(this.countDown,2);  
        this.z = 50;

        return true;
    },

    countDown: function  () {
        
        this.gameOver = new GameOver();
        this.gameOver.setPosition( new cc.Point( 400 + this.z , 300 ));
        this.addChild( this.gameOver ); 
        this.z = this.z+50;
     
    },

    startState: function( currentStage ) {
        this.bgQuestion = new BGQuestion( currentStage );
        this.bgQuestion.setPosition( new cc.Point( 400 , 300 ));
        this.addChild( this.bgQuestion ); 

        this.skips = new Array();
        for(var i=0 ; i<5 ; i++){
            this.skips[i] = new Skip( i );
            this.skips[i].setPosition(new cc.Point( 170 + (60 * i) , 530));
            this.addChild( this.skips[i] );
        }

        this.grade = new Grade();
        this.grade.setPosition( new cc.Point( 620 , 537 ));
        this.addChild( this.grade );

        this.choiceA = new Choice("A");
        this.choiceA.setPosition( new cc.Point( 150, 238 ) );
        this.addChild( this.choiceA );

        this.choiceB = new Choice("B");
        this.choiceB.setPosition( new cc.Point( 480, 237 ) );
        this.addChild( this.choiceB );

        this.choiceC = new Choice("C");
        this.choiceC.setPosition( new cc.Point( 150, 103 ) );
        this.addChild( this.choiceC );

        this.choiceD = new Choice("D");
        this.choiceD.setPosition( new cc.Point( 480, 103 ) );
        this.addChild( this.choiceD );
        
    },

    update: function(){
        if(this.currentStage==9) {
            this.currentStage = 0;
            this.gradeScore = 0;
            for(var i=0 ; i<5 ; i++){
                this.clickedSkip[i] = false;
            } 
            this.startState( this.currentStage );
        }

       
    },


    onMouseDown: function( e ){
        var position = e.getLocation();
        var indexOfChoice = this.getIndexChoiceButton( position );
        this.handlerChoiceButton( indexOfChoice );

        var indexOfSkip = this.getIndexSkipButton( position );
        this.handlerSkipButton( indexOfSkip );
        
    },

    onMouseMoved: function( e ){
        var position = e.getLocation();
        this.choiceA.mouseMoved( position );
        this.choiceB.mouseMoved( position );
        this.choiceC.mouseMoved( position );
        this.choiceD.mouseMoved( position );
        
        for (var i = 0; i < 5; i++){
            if(this.clickedSkip[i]==false){
                this.skips[i].mouseMoved( position , i);
            }
        }
    },

    getIndexChoiceButton: function( position ){
        var choices = [this.choiceA, this.choiceB, this.choiceC, this.choiceD];
        for(var i = 0; i < choices.length ; i++ ){
            var box = choices[i].getBoundingBox();
            if(cc.rectContainsPoint( box , position )){
                return i;
            }
        }
    },

    getIndexSkipButton: function( position ){
        var skipButton = [this.skips[0], this.skips[1], this.skips[2], this.skips[3], this.skips[4]];
        for(var i = 0 ; i < skipButton.length ; i++){
            var box = skipButton[i].getBoundingBox();
            if(cc.rectContainsPoint( box , position )){
                return i;
            }
        }
        return -1;
    },

    handlerChoiceButton: function( button ){
        if( button === 0 ){
            this.choiceA.changePic();
            this.clickChoiceSound();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER A" );
        } else if( button === 1 ){
            this.choiceB.changePic();
            this.clickChoiceSound();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER B" );
        } else if( button === 2 ){
            this.choiceC.changePic();
            this.clickChoiceSound();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER C" );
        } else if( button === 3 ){
            this.choiceD.changePic();
            this.clickChoiceSound();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER D" );
        } 
        else {
            console.log( "SOMEWHERE" );
        }
    },

    handlerSkipButton: function( indexOfSkip ){
        if(this.clickedSkip[indexOfSkip]==false){
            this.currentStage++;
            this.bgQuestion.changePic( this.currentStage );
            console.log("currentStage = " + this.currentStage);
            this.skips[indexOfSkip].setTexture(cc.TextureCache.getInstance().addImage('images/skipNotAllowed.png'));   
        } 
        this.clickedSkip[indexOfSkip] = true;    
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
            console.log( "This current stage = " + this.currentStage );
            console.log( "Wrong" );
        }
        
    },

    clickChoiceSound: function(){
        cc.AudioEngine.getInstance().playEffect('Sound/Pikachu.mp3');
    },

    transition: function(){

        var scene = GameOver.scene();
        var gameTransition = cc.TransitionFade.create(1, scene);
        cc.Director.getInstance().replaceScene(gameTransition);
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


