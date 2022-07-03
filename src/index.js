const keyboard = document.querySelector('#keyboard');
const keyboardLetters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete'],
];

const listElements = [];
let myAnswer = [];
const secretWord = ['p','l','a','t','z','i'];
let positions = [];

keyboardLetters.map(letters => {
  const list = document.createElement('ul');
  letters.map(letter => {
    const listItem = document.createElement('li');
    switch (letter) {
      case "enter":
        listItem.innerHTML = `
          <button onclick="checkWord()" id=${letter} >${letter}</button>
        `;
        break;
      case "delete":
        listItem.innerHTML = `
          <button onclick="deleteLetter()" id=${letter} >${letter}</button>
        `;
        break;
      default:
        listItem.innerHTML = `
          <button onclick="pressLetter()" id=${letter} >${letter}</button>
        `;
        break;
    }
    list.appendChild(listItem);
  });
  listElements.push(list);
});

// console.log(listElements);

keyboard.append(...listElements);

const checkWord = () => {
  if(myAnswer.length === secretWord.length){
    if (myAnswer.join('') === secretWord.join('')) {
      console.log('You win!');
    } else {
      for (let i = 0; i < secretWord.length; i++) {
        switch (true) {
          case myAnswer[i] === secretWord[i]:
            positions.push("green");
            break;
          case secretWord.includes(myAnswer[i]):
            positions.push("brown");
            break;
          default:
            positions.push("gray");
            break;
        }
      }
      console.log(positions);
    }
  } else {
    alert(`hey, your answer has only ${myAnswer.length} letters `);
  }
};

const deleteLetter = () => {
  if(myAnswer.length === 0){
    alert('you have no letters');

  }
  myAnswer.pop();
  console.log(myAnswer);
};

const pressLetter = () => {
  const button = event.target;
  if (myAnswer.length < secretWord.length) {
    myAnswer.push(button.id);
  } else {
    alert('you have already typed all letters');
  }
  // console.log(myAnswer);
};