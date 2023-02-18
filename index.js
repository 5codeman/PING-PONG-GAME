// Code is written by CHIRAG RAJ

// import "./styles.css";

let rod1 = document.getElementById("rod1");
let rod2 = document.getElementById("rod2");
let ball = document.getElementById("ball");
let rod1_Score = 0;
let rod2_Score = 0;
let gameStart = false;

//localStorage.getItem give null value when key is not find so when we match it with false then if condition is true and when we make key value false the false!=false gives false so, if condition is always false
if (localStorage.getItem("isFirstTime") !== "false") {
  localStorage.setItem("isFirstTime", "true");
  localStorage.setItem("rod1_max_score", "0");
  localStorage.setItem("rod2_max_score", "0");
}

// for game start alert message
if (localStorage.getItem("isFirstTime") === "true") {
  localStorage.setItem("isFirstTime", "false");
  alert(
    "Hello Player! I am CHIRAG 😎 Devloper of this Ping Pong Game! \n🟩This is your first time Go and show that you are a real Gamer🟩 \n\nGAME RULES:\n1. To start the Game Press Enter \n2. For moving the rod press left-right arrow key or A&D key"
  );
} else {
  alert(
    "-------------------------------------------------------------------\nHello Player! I am CHIRAG 😎 Devloper of this Ping Pong Game! \n-------------------------------------------------------------------\nGAME RULES:\n1. To start the Game Press Enter \n2. For moving the rod press left-right arrow key or A&D key\n------------------------------------------------------------------- \nRod 1 has maximum score of " +
      localStorage.getItem("rod1_max_score") +
      "\nRod 2 has maximum score of " +
      localStorage.getItem("rod2_max_score")
  );
}

// Set interval function
function set_interval() {
  let dimension_ball = ball.getBoundingClientRect();
  let dimension_rod1 = rod1.getBoundingClientRect();
  let dimension_rod2 = rod2.getBoundingClientRect();

  //when ball goes outside (Game over Condition)
  if (dimension_ball.bottom < 0 || dimension_ball.top > window.innerHeight) {
    //local storage handling
    let Local_Value1 = parseInt(localStorage.getItem("rod1_max_score"));
    let Local_Value2 = parseInt(localStorage.getItem("rod2_max_score"));

    let Find_max_rod1 = Math.max(Local_Value1, rod1_Score).toString();
    let Find_max_rod2 = Math.max(Local_Value2, rod2_Score).toString();
    localStorage.setItem("rod1_max_score", Find_max_rod1);
    localStorage.setItem("rod2_max_score", Find_max_rod2);
    gameStart = false;
    ball.classList.remove(ball.classList[0]);
    let audio = document.getElementById("audio1");
    audio.play();

    //game over alert
    alert(
      "GAME OVER😓 \n------------------------------\nRod 1 Current Score: " +
        rod1_Score +
        "\nRod 2 Current Score: " +
        rod2_Score +
        "\n------------------------------\nRod 1 Highest Score: " +
        Find_max_rod1 +
        "\nRod 2 Highest Score: " +
        Find_max_rod2
    );
    rod1_Score = 0;
    rod2_Score = 0;
    //Centerlize rod and ball
    rod1.style.left = window.innerWidth / 2 - rod1.clientWidth / 2 + "px";
    rod2.style.left = window.innerWidth / 2 - rod1.clientWidth / 2 + "px";
  }

  // when ball hit the right wall
  else if (dimension_ball.right >= window.innerWidth) {
    if (ball.classList[0] === "animate-top-right") {
      // let audio = new Audio("ball_hit.wav");
      // audio.play(); // not work (***DOUBT***)
      let audio = document.getElementById("audio");
      audio.play();
      ball.classList.remove("animate-top-right");
      ball.classList.add("animate-top-left");
    } else if (ball.classList[0] === "animate-bottom-right") {
      let audio = document.getElementById("audio");
      audio.play();
      ball.classList.remove("animate-bottom-right");
      ball.classList.add("animate-bottom-left");
    }
  }

  // when ball hit the Left wall
  else if (dimension_ball.left <= 0) {
    if (ball.classList[0] === "animate-top-left") {
      // let audio = new Audio("ball_hit.wav");
      // audio.play(); // not work (***DOUBT***)
      let audio = document.getElementById("audio");
      audio.play();
      ball.classList.remove("animate-top-left");
      ball.classList.add("animate-top-right");
    } else if (ball.classList[0] === "animate-bottom-left") {
      let audio = document.getElementById("audio");
      audio.play();
      ball.classList.remove("animate-bottom-left");
      ball.classList.add("animate-bottom-right");
    }
  }

  // when ball hit the Rod 1
  else if (
    dimension_rod1.bottom >= dimension_ball.top &&
    dimension_ball.right >= dimension_rod1.left &&
    dimension_ball.left <= dimension_rod1.right
  ) {
    if (ball.classList[0] === "animate-top-right") {
      rod1_Score++;
      let audio = document.getElementById("audio");
      audio.play();
      ball.classList.remove("animate-top-right");
      ball.classList.add("animate-bottom-right");
    } else if (ball.classList[0] === "animate-top-left") {
      rod1_Score++;
      let audio = document.getElementById("audio");
      audio.play();
      ball.classList.remove("animate-top-left");
      ball.classList.add("animate-bottom-left");
    }
  }

  // when ball hit the Rod2
  else if (
    dimension_rod2.top <= dimension_ball.bottom &&
    dimension_ball.right >= dimension_rod1.left &&
    dimension_ball.left <= dimension_rod1.right
  ) {
    if (ball.classList[0] === "animate-bottom-right") {
      rod2_Score++;
      let audio = document.getElementById("audio");
      audio.play();
      ball.classList.remove("animate-bottom-right");
      ball.classList.add("animate-top-right");
    } else if (ball.classList[0] === "animate-bottom-left") {
      rod2_Score++;
      let audio = document.getElementById("audio");
      audio.play();
      ball.classList.remove("animate-bottom-left");
      ball.classList.add("animate-top-left");
    }
  }
}
//set_interval ftn end

// set interval calling
setInterval(set_interval, 1); //1 milli seconds

// event listner for key
window.addEventListener("keydown", move);

//event listner function
function move(event) {
  let dimension_rod = rod1.getBoundingClientRect();
  let keycode = event.keyCode;

  //For move ball
  if (keycode === 13 && gameStart === false) {
    gameStart = true;
    ball.classList.add("animate-bottom-right");
  }

  //For move the rod
  else if (keycode === 68 || keycode === 39) {
    //in right direction
    if (dimension_rod.left === window.innerWidth - rod1.clientWidth - 6) return; //or rod2.clientWidth
    let dist = dimension_rod.left;
    dist += 15;
    rod1.style.left =
      Math.min(dist, window.innerWidth - rod1.clientWidth - 6) + "px";
    rod2.style.left =
      Math.min(dist, window.innerWidth - rod1.clientWidth - 6) + "px";
  } else if (keycode === 65 || keycode === 37) {
    //in left direction
    if (dimension_rod.left === 0) return;
    let dist = dimension_rod.left;
    dist -= 15;
    rod1.style.left = Math.max(dist, 0) + "px";
    rod2.style.left = Math.max(dist, 0) + "px";
  }
}
