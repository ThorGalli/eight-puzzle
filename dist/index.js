"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puzzle_1 = require("./puzzle");
const app = (0, express_1.default)();
const port = 3000;
const game = new puzzle_1.Puzzle();
app.use(express_1.default.json());
app.get('/start', (req, res) => {
    game.reset();
    res.json({ state: game.state });
});
app.post('/move', (req, res) => {
    const { move } = req.body;
    if (move === undefined) {
        return res.status(400).json({ error: 'Move parameter missing' });
    }
    if (!game.isValidMove(move)) {
        return res.status(400).json({ error: 'Invalid move' });
    }
    game.makeMove(move);
    if (game.isSolved()) {
        return res.json({ message: 'Congratulations! Puzzle solved!' });
    }
    res.json({ state: game.state });
});
app.post('/reset', (req, res) => {
    game.reset();
    res.json({ message: 'Game reset successfully' });
});
app.get('/status', (req, res) => {
    res.json({ state: game.state });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
