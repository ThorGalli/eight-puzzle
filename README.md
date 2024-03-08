# Description
This is the famous eight-puzzle game made is javascript, using express, sequelize and sqlite

# To run this project locally:

```
npm install

# then

npm run dev
# or
npm start
```
# Use these routes to play the game:

### To Start the Game
```
POST localhost:3001/start
# Body Example
{
	"password":"provideYourOwnPassword",
}

# Return Example 
{
	"id": "09e4a99b-a0ac-4e72-b34a-5582c0dd3781",
	"formatedState": [
		"1|2|3",
		"4|5|6",
		"7| |8"
	],
	"state": [
		[
			1,
			2,
			3
		],
		[
			4,
			5,
			6
		],
		[
			7,
			0,
			8
		]
	]
}
```
### To Move, use the GameSession ID and your password to move
```
POST localhost:3001/move
# Body Example
{
	"id":"09e4a99b-a0ac-4e72-b34a-5582c0dd3781",
	"password":"1",
	"move":8
}

# Return Example
{
	"error": "Congratulations! Puzzle solved!",
	"totalMoves": 1,
	"formatedState": [
		"1|2|3",
		"4|5|6",
		"7|8| "
	],
	"state": [
		[
			1,
			2,
			3
		],
		[
			4,
			5,
			6
		],
		[
			7,
			8,
			0
		]
	]
}
```
### To get game data
```
GET localhost:3001/allSessions

# Return Example:
[
	{
		"moveHistory": [
			3,
			3
		],
		"id": "e839cf7c-6618-4c05-9cbd-177c9c65dc44",
		"password": "1",
		"state": [
			[
				3,
				0,
				2
			],
			[
				8,
				1,
				6
			],
			[
				5,
				4,
				7
			]
		],
		"status": "active",
		"createdAt": "2024-03-08T16:38:32.494Z",
		"updatedAt": "2024-03-08T16:44:22.369Z"
	}
]

```
