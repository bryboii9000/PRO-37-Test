class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question ()
      question.display();
    }
  }

  play(){
    question.hide();
    
    
    text("Result Of The Quiz",displayWidth/2, 0)
    textSize(30);
    background("teal")
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      fill("prismarine");
      textSize(21);
      text("The Contestant Who Got the Answer correct Will Be Highlighted in Green",130,230);
    }

    for(var plr in allContestants){
      var correctAns = 2;
      if(correctAns === allContestants[plr].answer){
        fill("green");
      }else{
        fill("red");
      }
    }
    textSize(15);
    text(allContestants[plr].name+":"+[plr].distance,120,position);
    
  }

}
