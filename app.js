const board = document.querySelector(".game-board");
const boxes = document.querySelectorAll(".box");
const msg = document.querySelector(".msg");
const arielCounter = document.querySelector(".ariel .counter");
const ursulaCounter = document.querySelector(".ursula .counter");
// const arielNumber = document.querySelectorAll(".ariel .number");
// const ursulaNumber = document.querySelectorAll(".ursula .number");

window.addEventListener("load", function () {
  setTimeout(function open(event) {
    document.querySelector(".popup").style.display = "block";
  }, 1000);
  setTimeout(() => {
    arielCounter.style.transition = "transform 1.2s ease-in";
    arielCounter.style.transform = "translateY(0)";
    ursulaCounter.style.transition = "transform 1.2s ease-in";
    ursulaCounter.style.transform = "translateY(0)";
    // showScore(counter);
  }, 2000);
});

document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});

document.querySelector(".restart").addEventListener("click", reset);

const gameState = {
  playerTurn: "X",
  winner: null,
  draw: false,
  playerX: {
    team: "X",
    numberOfWins: 0,
    scoreElement: arielCounter,
    winAudio: [
      "./audio/Ya look great, kid. Ya look sensational.mp3",
      "./audio/The little tramp! She's better than I thought..mp3",
      "./audio/Kiddo, we did it!.mp3",
      "./audio/She's got legs, you idiot! She traded her voice to...mp3",
    ],
    winMsg: "Ariel wins",
  },
  playerO: {
    team: "O",
    numberOfWins: 0,
    scoreElement: ursulaCounter,
    winAudio: [
      "./audio/At last. It's mine..mp3",
      // "./audio/Have we got a deal_.mp3",
      "./audio/Pathetic..mp3",
      "./audio/Poor unfortunate souls in pain, in need..mp3",
      "./audio/Now, do we have a deal_.mp3",
    ],
    winMsg: "Usrula wins",
  },
};

function reset() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.className = "box";
  });
  gameState.winner = null;
  gameState.draw = false;
}

function placePawn(element) {
  if (gameState.playerTurn === "X") {
    element.className = "X";
    // element.innerText = "X";
    new Audio((src = "./audio/bubbles-03-91268.mp3")).play();
  } else {
    element.className = "O";
    // element.innerText = "O";
    new Audio((src = "./audio/pop-1-35897.mp3")).play();
  }
}
function switchTurn() {
  if (gameState.playerTurn === "X") {
    gameState.playerTurn = "O";
  } else {
    gameState.playerTurn = "X";
  }
}

board.addEventListener("click", (e) => {
  console.dir(e.target);
  if (
    e.target.classList.contains("X") ||
    e.target.classList.contains("O") ||
    e.target.classList.contains("game-board") ||
    gameState.winner
  ) {
    return;
  }
  placePawn(e.target);

  checkIsWinner(gameState.playerTurn);
  
  if (!gameState.winner) {
    checkIsDraw();
    if (gameState.draw) {
      handleDraw();
    }else{
      switchTurn();
    }
  } else {
    handleWin();
  }
});

function checkIsWinner(player) {
  if (
    (boxes[0].classList.contains(player) &&
      boxes[1].classList.contains(player) &&
      boxes[2].classList.contains(player)) ||
    (boxes[3].classList.contains(player) &&
      boxes[4].classList.contains(player) &&
      boxes[5].classList.contains(player)) ||
    (boxes[6].classList.contains(player) &&
      boxes[7].classList.contains(player) &&
      boxes[8].classList.contains(player)) ||
    (boxes[0].classList.contains(player) &&
      boxes[3].classList.contains(player) &&
      boxes[6].classList.contains(player)) ||
    (boxes[1].classList.contains(player) &&
      boxes[4].classList.contains(player) &&
      boxes[7].classList.contains(player)) ||
    (boxes[2].classList.contains(player) &&
      boxes[5].classList.contains(player) &&
      boxes[8].classList.contains(player)) ||
    (boxes[0].classList.contains(player) &&
      boxes[4].classList.contains(player) &&
      boxes[8].classList.contains(player)) ||
    (boxes[2].classList.contains(player) &&
      boxes[4].classList.contains(player) &&
      boxes[6].classList.contains(player))
  ) {
    console.log(player + " wins");
    gameState.winner = player;
    return true;
  }
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function showScore() {
  if (gameState[`player${gameState.winner}`].numberOfWins === null) {
  }
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function countScore() {
  gameState[`player${gameState.winner}`].numberOfWins += 1;
}

function checkIsDraw() {
  let allBoxesChecked = [...boxes].every(
    (box) => box.classList.contains("X") || box.classList.contains("O")
  );
  if (!gameState.winner && allBoxesChecked) {
    gameState.draw = true;
    return true;
  }
}

function showMsg(message) {
  // console.log(message);
  msg.innerText = message;
  setTimeout(() => {
    msg.innerText = null;
  }, 3000);
}

function handleWin() {
  const winner = gameState[`player${gameState.winner}`];
  countScore();
  showMsg(winner.winMsg);
  setTimeout(reset, 2000);
  showScore(winner.scoreElement);
  generateRandomAudio(winner.winAudio);
  console.log(gameState);
}

function handleDraw() {
  showMsg("Draw");
  setTimeout(reset, 2000);
  console.log(gameState);
}

function getTranslateY(element) {
  let translateValue = element.style.transform.replace(/[^-\d.]/g, "");
  console.log(element.style.transform);
  console.log("translate", translateValue);
  return translateValue;
}

function showScore(element) {
  const translateValue = getTranslateY(element);
  element.style.transform = `translateY(${translateValue - 92}px)`;
}
// for(let n of counter) {
//   const updateCount = () => {
//     const target = + n.getAttribute('data-target');
//     const count = + n.innerText;
//     const speed = 5000; // change animation speed here
//     const inc = target / speed;
//     if(count < target) {
//       n.innerText = Math.ceil(count + inc);
//       setTimeout(updateCount, 1);
//     } else {
//       n.innerText = target;
//     }
//   }
//   updateCount();
// }


function generateRandomAudio(arr) {
  let randomAudio = Math.floor(Math.random() * arr.length);
  new Audio((src = arr[randomAudio])).play();
}
