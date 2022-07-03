const keyboard = document.querySelector('#keyboard');
const grid = document.querySelector('#grid');
const keyboardLetters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete'],
];

const listElements = [];
let myAnswer = [];
const secretWords = [
  'p','l','a','t','z','i',
  // ['s','t','r','i','n','g']
];
  let positions = [];
let attempts = 0;

const rows =[];

for (let row = 0; row < 5; row++) {
  const list = document.createElement('ul');
  for (let column = 0; column < 6; column++) {
    const listItem = document.createElement('li');
    list.classList.add("grid-row");
    listItem.classList.add("grid-item");
    listItem.id = `${row}-${column}`;
    list.appendChild(listItem);  
  }
  rows.push(list);
}

grid.append(...rows);

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

keyboard.append(...listElements);

const checkWord = () => {
  console.log(positions);
  if(myAnswer.length === secretWords.length){
    if(attempts === 6) {
      alert('you have no more attempts');
      return
    }
    attempts += 1;
    
    for (let i = 0; i < secretWords.length; i++) {
      switch (true) {
        case myAnswer[i] === secretWords[i]:
          positions.push("green");
          break;
        case secretWords.includes(myAnswer[i]):
          positions.push("brown");
          break;
        default:
          positions.push("gray");
          break;
      }
    }
    
    console.log(positions.every(element => element === 'green')); 
    
      if(positions.every(position => position === "green")){
        setTimeout(() => {
          alert('get out of here');
          reset();
        }, 1000);
      }
    positions.map((color, id) => {
      const item = document.getElementById(`${attempts - 1}-${id}`);
      console.log(item);
      item.classList.add(color);
      // console.log(item);

    });

    myAnswer = [];
    positions = [];  
    
  } else {
    alert(`hey, your answer has only ${myAnswer.length} letters `);
  }


};

const deleteLetter = () => {
  if(myAnswer.length === 0){
    alert('you have no letters');

  }
  const item = document.getElementById(`${attempts}-${myAnswer.length - 1}`);
  item.textContent = '';
  myAnswer.pop();
};



const pressLetter = () => {
  const button = event.target;
  if (myAnswer.length < secretWords.length) {
    const currentItem = document.getElementById(`${attempts}-${myAnswer.length}`);
    (currentItem);
    currentItem.textContent = button.textContent; 
    myAnswer.push(button.id);
  } else {
    alert('you have already typed all letters');
  }
};

const reset = () => {
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 6; column++) {
      const item = document.getElementById(`${row}-${column}`);
      item.textContent = '';
      item.classList.remove('green', 'brown', 'gray');
      
    }
    
  }
  attempts = 0;
  myAnswer = [];
}

