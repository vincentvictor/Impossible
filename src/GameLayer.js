var GameLayer = cc.LayerColor.extend({
    init: function() {

        this._super( new cc.Color4B( 255, 255, 255, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.isGameOver=false;
        this.currentStage = 0;
        this.startState( this.currentStage );  

        var gradeScore;
        this.gradeScore = 0;   

        // skip button that was clicked
        var clickedSkip;
        this.clickedSkip = new Array();
      ;
        for( var i=0 ; i<5 ; i++ ){
            this.clickedSkip[i] = false;
            
        }   

        this.rainbowPoint = 0;

        // cc.AudioEngine.getInstance().playMusic( 'sound/nyancat.mp3', true );
       
        this.scheduleUpdate();
        this.setKeyboardEnabled( true );
        this.setMouseEnabled( true ); 

        return true;
    },



    startState: function( currentStage ) {
        this.bgQuestion = new BGQuestion( currentStage );
        this.bgQuestion.setPosition( new cc.Point( 400 , 300 ));
        this.addChild( this.bgQuestion ); 
        this.bgQuestion.startQuestion1();

        this.skips = new Array();
        for( var i=0 ; i<5 ; i++ ){
            this.skips[i] = new Skip( i );
            this.skips[i].setPosition( new cc.Point( 680  , 60 + (50*i) ));
            this.addChild( this.skips[i] );
        }

        this.choiceA = new Choice();
        this.choiceA.setPosition( new cc.Point( 70, 243 ) );
        this.addChild( this.choiceA );

        this.choiceB = new Choice();
        this.choiceB.setPosition( new cc.Point( 347, 243 ) );
        this.addChild( this.choiceB );

        this.choiceC = new Choice();
        this.choiceC.setPosition( new cc.Point( 70, 115 ) );
        this.addChild( this.choiceC );

        this.choiceD = new Choice();
        this.choiceD.setPosition( new cc.Point( 347, 115 ) );
        this.addChild( this.choiceD );

        this.nyanCat = new NyanCat();
        this.nyanCat.setPosition( new cc.Point( 100 , 550 ));
        this.addChild( this.nyanCat );

        this.pusheenCat = new PusheenCat(1);
        this.pusheenCat.setPosition( new cc.Point( 530 , 510 ));
        this.addChild( this.pusheenCat );
       
        //==============================

        this.count = 11;
        this.countLabel = cc.LabelTTF.create('10', 'Arial', 40);
        this.countLabel.setPosition( new cc.Point( 750 , 550 ) );
        this.addChild( this.countLabel );
        this.schedule( this.countDown ,1 );
        
    },
    
    countDown: function(){
        if(this.count > 0){
            this.count--;
            this.countLabel.setString(this.count);
        }
        else{
            this.gameOver();
            cc.AudioEngine.getInstance().stopMusic( 'sound/nyancat.mp3', true );
            this.unschedule(this.countDown);
        }
    },

    update: function(){
        //if( this.currentStage==9 || this.gradeScore==4 ) {
        if( this.currentStage==30 ) {
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

    callStartScene: function(){
        cc.AudioEngine.getInstance().playMusic( 'sound/nyancat.mp3', true );
        var director = cc.Director.getInstance();
        director.replaceScene(cc.TransitionFade.create(5,new StartScene()));
    },


    onMouseDown: function( e ){
        var position = e.getLocation();
        if( !this.isGameOver ) {
            
            if(this.currentStage ==10){
                var box = this.special11.getBoundingBox();
                if( cc.rectContainsPoint( box , position ) ){
                    this.checkRightAnswer( 9 );
                    this.removeChild(this.special11);
                }
            }
            else if(this.currentStage==17){
                var box = this.special18.getBoundingBox();
                if( cc.rectContainsPoint( box , position ) ){
                    this.checkRightAnswer( 9 );
                    this.removeChild(this.special18);
                    this.addChild(this.choiceA);
                    this.addChild(this.choiceB);
                    this.addChild(this.choiceC);
                    this.addChild(this.choiceD);
                }
            }
          
                var indexOfSkip = this.getIndexSkipButton( position );
                this.handlerSkipButton( indexOfSkip );
       

            var indexOfChoice = this.getIndexChoiceButton( position );
            this.handlerChoiceButton( indexOfChoice );

            
        }
        else {
            for( var i=0 ; i<1 ; i++){
                var box = this.tryAgain[i].getBoundingBox();
                cc.AudioEngine.getInstance().playMusic( 'sound/nyancat.mp3', true );
                if ( cc.rectContainsPoint(box, position) ){
                    this.callStartScene();
                }
            }
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
            for ( var i = 0; i < 1; i++ ){
                this.tryAgain[i].mouseMoved( position , i);
            }
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
            this.count = 11;
            this.schedule( this.countDown ,1 );
            this.currentStage++;
            this.bgQuestion.changePic( this.currentStage );
            
             cc.AudioEngine.getInstance().playEffect('Sound/pikachu.mp3');
            this.skips[indexOfSkip].setTexture(cc.TextureCache.getInstance().addImage('images/skipNotAllowed.png'));   
        } 
        this.clickedSkip[indexOfSkip] = true;    
    },
   
    checkRightAnswer: function ( button ){
        var answers = [3,1,1,0,2,2,1,3,2,2, 9,2,0,0,1,3,2,9,3,2 ]; // answer of question 1-10
        
        if( button === answers[this.currentStage] ){
            this.clickRightChoiceSound();
            this.currentStage++;
            
            if(this.currentStage==20){
                this.end = new BGQuestion();
                this.end.setPosition( new cc.Point(400,300));
                this.end.endGame();
                this.addChild(this.end);
                this.unschedule(this.countDown);
            }else {
            this.bgQuestion.changePic( this.currentStage );
            }
            

            this.count = 11;
            this.schedule( this.countDown ,1 );

            if(this.currentStage==10){
                this.special11 = new SpecialQuestion();
                this.special11.show11();
                this.addChild(this.special11);
            }
            else if(this.currentStage==17){
                this.removeChild(this.choiceA);
                this.removeChild(this.choiceB);
                this.removeChild(this.choiceC);
                this.removeChild(this.choiceD);
                this.special18 = new SpecialQuestion();
                this.special18.show18();
                this.addChild(this.special18);

            }
            
        }
        else {
            this.wrong = new Wrong();
            this.wrong.setPosition( new cc.Point( 630, 360 ) );
            this.addChild( this.wrong );
            this.schedule( this.timerWrong,0.3,0,0 );

            this.rainbow = new Array();
            for( var i=0 ; i<2 ; i++){
                
                this.rainbow[i] = new Rainbow();
                this.rainbow[i].setPosition( new cc.Point( 100+(this.rainbowPoint*35) , 550 ));
                this.addChild( this.rainbow[i] );
                this.rainbowPoint++;
            }
            

            this.clickWrongChoiceSound();
            this.gradeScore++;
            if( this.gradeScore<5 ){
                this.nyanCat.changePosition( this.gradeScore );
            }
            else{
                this.nyanCat.changePosition( this.gradeScore );
                this.gameOver();
                cc.AudioEngine.getInstance().stopMusic( 'sound/nyancat.mp3', true );
            }
        }
    
    },

    //===================================================================

    // timerQuestion: function  () { // countDown
    //     this.currentStage = 0;
    //     this.gradeScore = 0;
    //     for( var i=0 ; i<5 ; i++ ){
    //         this.clickedSkip[i] = false;
    //     } 
    //     this.gameOver();
     
    // },

    timerWrong: function() {
        this.removeChild( this.wrong );
    },

    //===================================================================

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
        this.addChild( this.gameOverPic , 2 );
        this.schedule( this.updateShowGameOver,0,Infinity,0 );


        this.tryAgain = new Array();
        for( var i=0 ; i<1 ; i++ ){
            this.tryAgain[i] = new TryAgain( i );
            this.tryAgain[i].setOpacity( 0 );
            this.addChild( this.tryAgain[i] , 3);
            this.tryAgain[i].position(i);
           
        }
        this.schedule( this.updateShowTryAgain,0,Infinity,0 );
        
    },

    //===================================================================

    updateShowGameOver: function() {
        var opacity = this.gameOverPic.getOpacity();
        this.gameOverPic.setOpacity( opacity+17/8 );
        if( this.gameOverPic.getOpacity()>=255 ) {
            this.gameOverPic.setOpacity( 255 );
            this.unschedule( this.updateShowGameOver );
        }
    },

    updateShowTryAgain: function(){
        for( var i=0 ; i<1 ; i++){
            var opacity = this.tryAgain[i].getOpacity();
            this.tryAgain[i].setOpacity( opacity+17/8 );
            if( this.tryAgain[i].getOpacity()>=255 ) {
                this.tryAgain[i].setOpacity( 255 );
                this.unschedule( this.updateShowTryAgain );
            }
        }
    },

    //===================================================================

    updateHideGameOver: function() {
        var opacity = this.gameOverPic.getOpacity();
        this.gameOverPic.setOpacity( opacity-17/4 );
        if( this.gameOverPic.getOpacity()<=0 ) {
            this.removeChild( this.gameOverPic );
            this.unschedule( this.updateHideGameOver );
        }
    },

    // restartGame: function() {
    //     this.startNewGame();
    //     // remove try again button duay
    //     this.schedule( this.updateHideGameOver,0,Infinity,0 );
    // },
    

    clickRightChoiceSound: function(){
        cc.AudioEngine.getInstance().playEffect('Sound/catRight.mp3');
    },

    clickWrongChoiceSound: function(){
        cc.AudioEngine.getInstance().playEffect('Sound/catWrong.mp3');
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
