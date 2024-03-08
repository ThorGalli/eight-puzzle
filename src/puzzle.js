
const SIZE = 3; // Size of the puzzle grid (3x3)
const EMPTY_TILE = 0;

export function isSolved(state){
  const flatState = state.flat();
  for (let i = 0; i < flatState.length - 1; i++) {
    if (flatState[i] !== i + 1) {
      return false;
    }
  }
  return true;
}

export function makeMove(state, move){
  const flatState = state.flat();
  const emptyIndex = flatState.indexOf(EMPTY_TILE);
  const moveIndex = flatState.indexOf(move);

  [flatState[emptyIndex], flatState[moveIndex]] = [flatState[moveIndex], flatState[emptyIndex]];

  const newState = [];
  for (let i = 0; i < SIZE; i++) {
    newState.push(flatState.slice(i * SIZE, (i + 1) * SIZE));
  }
  return newState;
}

export function isValidMove(state, move){
  const flatState = state.flat();
  const emptyIndex = flatState.indexOf(EMPTY_TILE);
  const moveIndex = flatState.indexOf(move);

  // Check if move is adjacent to the empty tile
  if (Math.abs(moveIndex - emptyIndex) !== 1 && Math.abs(moveIndex - emptyIndex) !== SIZE) {
    return false;
  }

  // Check if move is in the same row or column as the empty tile
  return Math.floor(moveIndex / SIZE) === Math.floor(emptyIndex / SIZE) || moveIndex % SIZE === emptyIndex % SIZE;
}

export function generateRandomState(){
  let numbers = [...Array(SIZE * SIZE).keys()]; // 0 to 8
  numbers = shuffleArray(numbers);
  const state = [];

  for (let i = 0; i < SIZE; i++) {
    const row = [];
    for (let j = 0; j < SIZE; j++) {
      row.push(numbers[i * SIZE + j]);
    }
    state.push(row);
  }

  return state;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function formatedState(state){
  return [
    state[0].join('|').replace(/0/g, ' '),
    state[1].join('|').replace(/0/g, ' '),
    state[2].join('|').replace(/0/g, ' ')
  ];
}

export function createEasyGame(){
  return [
    [1, 2, 3],
    [4, 5, 6],
    [7, 0, 8]
  ];
}