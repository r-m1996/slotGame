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
  document.getElementById('score').textContent = totalScore;
}

function setConsentCookie() {
  var now = new Date();
  var expirationDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  document.cookie = "consentGiven=true; expires=" + expirationDate.toUTCString() + "; path=/";
}

function checkConsent() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie === "consentGiven=true") {
      return true;
    }
  }
  return false;
}

document.getElementById('acceptCookieConsent').addEventListener('click', function () {
  setConsentCookie();
  document.getElementById('cookieConsentPopup').style.display = 'none';
  document.getElementById('spinButton').disabled = false;
});

window.onload = function () {
  loadGame();
  updateScoreDisplay();
  if (!checkConsent()) {
    document.getElementById('cookieConsentPopup').style.display = 'block';
  } else {
    document.getElementById('spinButton').disabled = false;
  }
};

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function saveGame() {
  setCookie('userScore', totalScore, 365);
  setCookie('userWins', winCount, 365);
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function loadGame() {
  var savedScore = getCookie('userScore');
  var savedWins = getCookie('userWins');
  totalScore = savedScore ? parseInt(savedScore) : 0;
  winCount = savedWins ? parseInt(savedWins) : 0;
}


function updateScoreDisplay() {
  document.getElementById('score').textContent = totalScore;
  document.getElementById('wins').textContent = winCount;
}
