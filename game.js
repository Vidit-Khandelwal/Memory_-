var started = false;
var level = 0;


var userClickedPattern = [];



var gamePattern = [];


var buttonColours = ["red", "blue", "green", "yellow", "aqua", "orange"];


$(document).on("keypress", function () {

  if (started == true) {

    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").html("Wrong Call Pls Reload Page to Continue");
    setTimeout(function () {
      $("body").removeClass("game-over");

    }, 200);
    // startOver();
  }

})

$(document).on("keypress", function () {
  if (started == false) {
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  }

})









$(".btn").on("click", function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

})


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 6);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {

  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();

}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000)
    }
  }

  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");

    }, 200);
    startOver();
  }

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}



