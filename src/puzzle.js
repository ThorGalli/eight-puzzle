
const SIZE = 3; // Size of the puzzle grid (3x3)
const EMPTY_TILE = 0;
const SCRAMBLE_AMOUNT = 100;

export function isSolved(state) {
  const flatState = state.flat();
  for (let i = 0; i < flatState.length - 1; i++) {
    if (flatState[i] !== i + 1) {
      return false;
    }
  }
  return true;
}

export function makeMove(state, move) {
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

export function isValidMove(state, move) {
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

export function generateRandomState() {
  const startState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
  ]

  let state = startState;
  const moveAmount = 1 + Math.floor(Math.random() * SCRAMBLE_AMOUNT - 1);
  for (let i = 0; i < moveAmount; i++) {
    const validMoves = [1, 2, 3, 4, 5, 6, 7, 8].filter((move) => isValidMove(state, move));
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
    state = makeMove(state, randomMove);
  }
  return state;
}



export function formatedState(state) {
  return [
    state[0].join('|').replace(/0/g, ' '),
    state[1].join('|').replace(/0/g, ' '),
    state[2].join('|').replace(/0/g, ' ')
  ];
}

export function createEasyGame() {
  return [
    [1, 2, 3],
    [4, 5, 6],
    [7, 0, 8]
  ];
}