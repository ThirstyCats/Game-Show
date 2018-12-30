const phrase = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
const keyrow = document.getElementsByClassName('keyrow');
const start = document.getElementsByClassName('btn__reset');
const btn = document.getElementsByTagName('BUTTON');
const overlay = document.getElementById('overlay');
const phrases = [
                'Like Father Like Son',
                'A Piece of Cake',
                'Cut the Mustard',
                'Learn the Ropes',
                'Barking up the Wrong Tree'
              ];
let missed = 0;
let currentPhrase = [];

function begin() {
start[0].addEventListener('click', () => {
  overlay.style.display = 'none';
  currentPhrase = getRandomPhraseArray(phrases);
  addPhraseToDisplay(currentPhrase);
  })
}

function getRandomPhraseArray (arr) {
  const arrIndex = arr.length;
  const randIndex = Math.floor(Math.random() * arrIndex);
  const arrPhrase = arr[randIndex];
  let arrSplit = arrPhrase.split(' ');
  let char = [];
  for (let i = 0; i < arrSplit.length; i++){
    char += arrSplit[i] + ' ';
  }
  return char;
}

function addPhraseToDisplay(arr) {
  const ul = phrase.getElementsByTagName('UL');
  for (let i = 0; i < arr.length; i++) {
    const text = arr[i].toString();
    const li = document.createElement('LI');
    if (text !== ' ') {
      li.className = 'letter';
      ul[0].appendChild(li);
      li.innerHTML += text;
    } else {
      li.className = 'space';
      ul[0].appendChild(li);
    }
  }
}

function letterClick() {
  const phrase = document.getElementsByClassName('letter');
  let letterMatch = 0;
  let letterClick = 0;

  for(let i = 0; i < keyrow.length; i++) {

    keyrow[i].addEventListener('click', function grabLetter(e){
      const clickedItem = e.target;
      var clickedLetter = clickedItem.innerHTML;
      letterClick += 1;

      for(let i = 0; i < phrase.length; i++) {
        Array.from(currentPhrase).forEach(function checkLetter() {  // Uses forEach in order to catch consecutive identical letters.
          if (phrase[i].innerHTML.toLowerCase() === clickedLetter) {
            phrase[i].className = 'show letter' ;
            letterClick = letterMatch;
          }
        })
      }

      if (e.target !== e.currentTarget) {     // logic to change button classname and attribute.
        clickedItem.className = 'chosen';
        clickedItem.setAttribute('disabled', 'true');
        if (letterMatch !==letterClick) {
          missed += 1;
        }
      }

      function loseLives(missed) {
        const heart = document.getElementsByClassName('tries');
        if(missed > 0) {
          heart[missed -=1].style.display = 'none';
        }
      }


      function checkWin() {
        const show = document.getElementsByClassName('show');
        if(show.length === phrase.length) {
          overlay.className = 'win';
          overlay.style.display = 'block';
          overlay.querySelector('.title').innerHTML = 'YOU WIN!';
          reset()
        }
        else if(missed === 5) {
          overlay.className = 'lose';
          overlay.style.display = 'block';
          overlay.querySelector('.title').innerHTML = 'YOU LOSE! :( ';
          reset()
        }
      }
      loseLives(missed);
      checkWin();
    })
  }
}


function reset() {
  start[0].innerHTML = 'RESET';
  missed = 0;
  const ul = document.createElement('UL');
  const heart = document.getElementsByClassName('tries');


  while(phrase.firstChild) {
      phrase.removeChild(phrase.firstChild);
    }

  phrase.appendChild(ul);

  for(let i = 0; i < btn.length; i++){
    btn[i].removeAttribute('disabled');
    btn[i].removeAttribute('class');
    }

  for(let i = 0; i < heart.length; i++){
    heart[i].style.display = 'inline';
  }
}



begin();
letterClick();
