var totalScore = 0;
var winCount = 0;

const PROB_LEMON = 0.5;
const PROB_CHERRY = 0.3;
const PROB_SEVEN = 0.2;

document.getElementById('spinButton').addEventListener('click', function () {
  var reels = document.querySelectorAll('.reel');
  reels.forEach(function (reel) {
    reel.classList.add('spinning');
  });

  setTimeout(function () {
    var symbols = [];
    reels.forEach(function (reel) {
      reel.classList.remove('spinning');
      symbols.push(spinReel(reel.id));
    });
    updateScore(symbols);
  }, 1000);
});

function spinReel(reelId) {
  var reel = document.getElementById(reelId);
  var randomNumber = Math.random();
  var symbol;

  if (randomNumber < PROB_LEMON) {
    symbol = '🍋';
  } else if (randomNumber < PROB_LEMON + PROB_CHERRY) {
    symbol = '🍒';
  } else {
    symbol = '7';
  }
  reel.textContent = symbol;
  return symbol;
}

function updateScore(symbols) {
  if (symbols.every((val, i, arr) => val === arr[0])) {
    winCount++;
    document.getElementById('wins').textContent = winCount;

    var score = 0;
    switch (symbols[0]) {
      case '7':
        score = 100;
        break;
      case '🍒':
        score = 50;
        break;
      case '🍋':
        score = 20;
        break;
    }
    totalScore += score;
  }
  // スコアを更新
  document.getElementById('score').textContent = totalScore;
}
