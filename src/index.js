import express, { json } from 'express';
import GameSession from './model/gameSession.js';
import { generateRandomState, isValidMove, isSolved, makeMove, formatedState, createEasyGame } from './puzzle.js';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000

const howToPlay = {
    title: 'Welcome to the 8-puzzle API',
    message: 'To play this game use the following endpoints in Insomnia Postman',
    obs: 'Use the generated ID and the chosen PASSWORD to make moves',
    endpoints: [
        {
            path: '/start',
            method: 'POST',
            description: 'Start a new game session',
            body: {
                password: 'string',
            }
        },
        {
            path: '/move',
            method: 'POST',
            description: 'Make a move on a game session',
            body: {
                id: 'number',
                password: 'string',
                move: 'number'
            }
        },
        {
            path: '/status/:sessionId',
            method: 'GET',
            description: 'Get the current state of a game session'
        }
    ]
}
app.use(json());

app.get('/', (req, res) => {
    res.json(howToPlay);
});

app.get('/start', (req, res) => {
    res.json(howToPlay);
});



app.post('/start', async (req, res) => {
    const { password, easy } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password parameter missing' });
    }

    try {
        const gameSession = await GameSession.create({
            password,
            state: easy ? createEasyGame() : generateRandomState()
        });
        res.json({
            id: gameSession.id,
            formatedState: formatedState(gameSession.state),
            state: gameSession.state,
        });
    } catch (error) {
        console.error('Error starting game:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/move', async (req, res) => {
    const { id, password, move } = req.body;



    if (!id || move === undefined) {
        return res.status(400).json({ error: 'Session ID or move parameter missing' });
    }


    try {
        const gameSession = await GameSession.findByPk(id);
        if (!gameSession) {
            return res.status(404).json({ error: 'Game session not found' });
        }

        if (gameSession.status === 'solved') {
            return res.status(400).json({
                error: 'Game already solved',
                status: gameSession.status,
                totalMoves: gameSession.moveHistory.length,
                formatedState: formatedState(gameSession.state),
                state: gameSession.state,
            });
        }

        if (typeof move !== 'number' || move < 1 || move > 9) {
            return res.status(400).json({
                error: 'Invalid move',
                status: gameSession.status,
                validMoves: [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((move) => isValidMove(oldState, move)),
                formatedState: formatedState(oldState),
                state: oldState,
            });
        }

        const { password: sessionPassword, state: oldState } = gameSession;
        if (password !== sessionPassword) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!isValidMove(oldState, move)) {
            return res.status(400).json({
                error: 'Invalid move',
                status: gameSession.status,
                validMoves: [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((move) => isValidMove(oldState, move)),
                formatedState: formatedState(oldState),
                state: oldState,
            });
        }

        const newState = makeMove(oldState, move);
        gameSession.moveHistory = [...gameSession.moveHistory, move];
        gameSession.state = newState;

        if (isSolved(newState)) {
            gameSession.status = 'solved';
            await gameSession.save();
            return res.json({
                message: 'Congratulations! Puzzle solved!',
                status: gameSession.status,
                totalMoves: gameSession.moveHistory.length,
                formatedState: formatedState(newState),
                newState
            });
        }

        await gameSession.save();
        res.json({
            message: 'Move successful',
            status: gameSession.status,
            totalMoves: gameSession.moveHistory.length,
            formatedState: formatedState(newState),
            newState
        });
    } catch (error) {
        console.error('Error making move:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/status/:sessionId', async (req, res) => {
    const sessionId = req.params.sessionId;
    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID parameter missing' });
    }

    try {
        const gameSession = await GameSession.findByPk(sessionId);
        if (!gameSession) {
            return res.status(404).json({ error: 'Game session not found' });
        }
        res.json({ state: gameSession.state });
    } catch (error) {
        console.error('Error getting game status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/allSessions', async (req, res) => {
    try {
        const gameSessions = await GameSession.findAll();
        res.json(gameSessions);
    } catch (error) {
        console.error('Error getting game sessions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})