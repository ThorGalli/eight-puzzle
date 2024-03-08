"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Puzzle = void 0;
class Puzzle {
    constructor() {
        this.state = this.generateRandomState();
    }
    // Generates a random initial state for the puzzle
    generateRandomState() {
        let numbers = [...Array(Puzzle.SIZE * Puzzle.SIZE).keys()]; // 0 to 8
        numbers = this.shuffleArray(numbers);
        const state = [];
        for (let i = 0; i < Puzzle.SIZE; i++) {
            const row = [];
            for (let j = 0; j < Puzzle.SIZE; j++) {
                row.push(numbers[i * Puzzle.SIZE + j]);
            }
            state.push(row);
        }
        return state;
    }
    // Fisher-Yates shuffle algorithm to shuffle array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    // Check if a move is valid
    isValidMove(move) {
        const flatState = this.state.flat();
        const emptyIndex = flatState.indexOf(Puzzle.EMPTY_TILE);
        const moveIndex = flatState.indexOf(move);
        // Check if move is adjacent to the empty tile
        if (Math.abs(moveIndex - emptyIndex) !== 1 && Math.abs(moveIndex - emptyIndex) !== Puzzle.SIZE) {
            return false;
        }
        // Check if move is in the same row or column as the empty tile
        return Math.floor(moveIndex / Puzzle.SIZE) === Math.floor(emptyIndex / Puzzle.SIZE) || moveIndex % Puzzle.SIZE === emptyIndex % Puzzle.SIZE;
    }
    // Make a move
    makeMove(move) {
        const flatState = this.state.flat();
        const emptyIndex = flatState.indexOf(Puzzle.EMPTY_TILE);
        const moveIndex = flatState.indexOf(move);
        [flatState[emptyIndex], flatState[moveIndex]] = [flatState[moveIndex], flatState[emptyIndex]];
        this.state = [];
        for (let i = 0; i < Puzzle.SIZE; i++) {
            this.state.push(flatState.slice(i * Puzzle.SIZE, (i + 1) * Puzzle.SIZE));
        }
    }
    // Check if the puzzle is solved
    isSolved() {
        const flatState = this.state.flat();
        for (let i = 0; i < flatState.length - 1; i++) {
            if (flatState[i] !== i + 1) {
                return false;
            }
        }
        return true;
    }
    // Resets the puzzle to a random initial state
    reset() {
        this.state = this.generateRandomState();
    }
}
exports.Puzzle = Puzzle;
Puzzle.SIZE = 3; // Size of the puzzle grid (3x3)
Puzzle.EMPTY_TILE = 0;
