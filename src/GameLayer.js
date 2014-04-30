var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 255, 255, 255, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        var currentStage;
        this.isGameOver=false;
        this.currentStage = 0;
        this.startState( currentStage );  

        // A=0, B+=1, B=2, C+=3, C=4 , D=5 ,D+=6, F=7
        var gradeScore;
        this.gradeScore = 0;   

        // skip button that was clicked
        var clickedSkip;
        this.clickedSkip = new Array();
        for( var i=0 ; i<5 ; i++ ){
            this.clickedSkip[i] = false;
        }   
       
        this.scheduleUpdate();
        this.setMouseEnabled( true ); 

        return true;
    },

    countDown: function  () { 
        this.currentStage = 0;
        this.gradeScore = 0;
        for( var i=0 ; i<5 ; i++ ){
            this.clickedSkip[i] = false;
        } 
        this.startState( this.currentStage );
     
    },

    startState: function( currentStage ) {
        this.bgQuestion = new BGQuestion( currentStage );
        this.bgQuestion.setPosition( new cc.Point( 400 , 300 ));
        this.addChild( this.bgQuestion ); 

        this.skips = new Array();
        for( var i=0 ; i<5 ; i++ ){
            this.skips[i] = new Skip( i );
            this.skips[i].setPosition( new cc.Point( 170 + (60 * i) , 530));
            this.addChild( this.skips[i] );
        }

        this.grade = new Grade();
        this.grade.setPosition( new cc.Point( 620 , 537 ));
        this.addChild( this.grade );

        this.choiceA = new Choice("A");
        this.choiceA.setPosition( new cc.Point( 146, 238 ) );
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
        //if( this.currentStage==9 || this.gradeScore==4 ) {
        if( this.currentStage==9 ) {
            this.startNewGame();
        }
    },
    startNewGame: function() {
        this.currentStage = 0;
        this.gradeScore = 0;
        for( var i=0 ; i<5 ; i++ ){
            this.clickedSkip[i] = false;
        } 
        this.startState( this.currentStage );
    },


    onMouseDown: function( e ){
        var position = e.getLocation();
        if( !this.isGameOver ) {
            var indexOfChoice = this.getIndexChoiceButton( position );
            this.handlerChoiceButton( indexOfChoice );

            var indexOfSkip = this.getIndexSkipButton( position );
            this.handlerSkipButton( indexOfSkip );
        }
        else {
            // try again
            // menu
            //ไม่เกี่วกับการเล่นเกม
        }
    },

    onMouseMoved: function( e ){
        var position = e.getLocation();

        if( !this.isGameOver ) {
            this.choiceA.mouseMoved( position );
            this.choiceB.mouseMoved( position );
            this.choiceC.mouseMoved( position );
            this.choiceD.mouseMoved( position );
        
            for ( var i = 0; i < 5; i++ ){
                if( this.clickedSkip[i]==false ){
                    this.skips[i].mouseMoved( position , i);
                }
            }
        }
        else {

        }
    },

    getIndexChoiceButton: function( position ){
        var choices = [this.choiceA, this.choiceB, this.choiceC, this.choiceD];
        for( var i = 0; i < choices.length ; i++ ){
            var box = choices[i].getBoundingBox();
            if( cc.rectContainsPoint( box , position ) ){
                return i;
            }
        }
    },

    getIndexSkipButton: function( position ){
        var skipButton = [this.skips[0], this.skips[1], this.skips[2], this.skips[3], this.skips[4]];
        for( var i=0 ; i<skipButton.length ; i++ ){
            var box = skipButton[i].getBoundingBox();
            if( cc.rectContainsPoint( box , position ) ){
                return i;
            }
        }
        return -1;
    },

    handlerChoiceButton: function( button ){
        if( button === 0 ){
            this.choiceA.changePic();
           // this.clickChoiceSound();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER A" );
        } else if( button === 1 ){
            this.choiceB.changePic();
           // this.clickChoiceSound();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER B" );
        } else if( button === 2 ){
            this.choiceC.changePic();
           // this.clickChoiceSound();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER C" );
        } else if( button === 3 ){
            this.choiceD.changePic();
           // this.clickChoiceSound();
            this.checkRightAnswer( button );
            console.log( "CLICK ANSWER D" );
        } 
        else {
            console.log( "SOMEWHERE" );
        }
    },

    handlerSkipButton: function( indexOfSkip ){
        if( this.clickedSkip[indexOfSkip]==false ){
            this.currentStage++;
            this.bgQuestion.changePic( this.currentStage );
            console.log("currentStage = " + this.currentStage);
            this.skips[indexOfSkip].setTexture(cc.TextureCache.getInstance().addImage('images/skipNotAllowed.png'));   
        } 
        this.clickedSkip[indexOfSkip] = true;    
    },
   
    checkRightAnswer: function ( button ){
        var answers = [0,1,2,3,0,1,2,3,0,1]; // answer of question 1-10
            
        if( button === answers[this.currentStage] ){
            this.clickRightChoiceSound();
            this.currentStage++;
            this.bgQuestion.changePic( this.currentStage );
            console.log( "This current stage = " + this.currentStage );
            console.log( "Right" );
        }
        else {
           // var scene = GameOverScene;
           //  var gameTransition = cc.TransitionFade.create(1, scene);
           //  cc.Director.getInstance().replaceScene(gameTransition);

            this.clickWrongChoiceSound();
            this.gradeScore++;
            if( this.gradeScore<4 ){
                this.grade.changePic( this.gradeScore );
            }
            else
                this.gameOver();
        }

        // if( this.currentStage>0 ){
        //     this.unschedule(this.countDown);
        // }
        // this.schedule(this.countDown,3);    
    },
    gameOver: function() {
        // for( var i=0;i<this.skips.length;i++ ) {
        //     this.removeChild( this.skips[i] );
        // }
        // this.removeChild( this.choiceA );
        // this.removeChild( this.choiceB );
        // this.removeChild( this.choiceC );
        // this.removeChild( this.choiceD );
        // this.removeChild( this.grade );
        // this.schedule( this.updateHideGameOver,0,Infinity,0 );
        this.isGameOver = true;
        this.gameOverPic = new GameOver();
        this.gameOverPic.setOpacity( 0 );
        this.gameOverPic.setPosition( new cc.Point( 400 , 300 ));
        this.addChild( this.gameOverPic,100 );
        this.schedule( this.updateShowGameOver,0,Infinity,0 );
    },
    updateShowGameOver: function() {
        var opacity = this.gameOverPic.getOpacity();
        this.gameOverPic.setOpacity( opacity+17/4 );
        if( this.gameOverPic.getOpacity()>=255 ) {
            this.gameOverPic.setOpacity( 255 );
            this.unschedule( this.updateShowGameOver );
        }

    },
    restartGame: function() {
        this.startNewGame();
        // remove try again button duay
        this.schedule( this.updateHideGameOver,0,Infinity,0 );
    },
    updateHideGameOver: function() {
        var opacity = this.gameOverPic.getOpacity();
        this.gameOverPic.setOpacity( opacity-17/2 );
        if( this.gameOverPic.getOpacity()<=0 ) {
            this.removeChild( this.gameOverPic );
            this.unschedule( this.updateHideGameOver );
        }
    },


    clickRightChoiceSound: function(){
        cc.AudioEngine.getInstance().playEffect('Sound/Pikachu.mp3');
    },

    clickWrongChoiceSound: function(){
        cc.AudioEngine.getInstance().playEffect('Sound/Crow.mp3');
    },

    // transition: function(){
    //     var scene = GameOver.scene();
    //     var gameTransition = cc.TransitionFade.create(1, scene);
    //     cc.Director.getInstance().replaceScene(gameTransition);
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
