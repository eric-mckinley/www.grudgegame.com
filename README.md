# www.grudgegame.com
Simlpes - static 1v1 score tracker website


### Suggest a Chart

Create a chart as a pull request to be added to site.


Create a function that takes with the naming *createChartX* where X is the number of the next chart that would be added to *js/grudge_charts.js*

The function should take a canvas context for renderin the chart and the GrudgeMatch data. A sample format is shown below.

The function should return a string of the chart title.


```javascript
{
  "leagueName": "Darts 501",
  "playerA": "Popeye",
  "playerB": "Olive Oyl",
  "config": {
    "winMatchesForSet": 3,
    "colorA": "BB0F97",
    "colorB": "04DD9E"
  },
  "matches": [
    {
      "scorePlayerA": 1,
      "scorePlayerB": 0
    },
    {
      "scorePlayerA": 1,
      "scorePlayerB": 0
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 1,
      "scorePlayerB": 0
    },
    {
      "scorePlayerA": 1,
      "scorePlayerB": 0
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 1,
      "scorePlayerB": 0
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 1,
      "scorePlayerB": 0
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 0,
      "scorePlayerB": 1
    },
    {
      "scorePlayerA": 1,
      "scorePlayerB": 0
    },
    {
      "scorePlayerA": 1,
      "scorePlayerB": 0
    }
  ],
  "leagues": [
    {
      "gamesPlayerA": [
        1,
        1,
        0,
        0,
        0
      ],
      "gamesPlayerB": [
        0,
        0,
        1,
        1,
        1
      ],
      "maxGamesPerSet": 5,
      "playerAWins": false,
      "playerBWins": true,
      "playerAGames": 2,
      "playerBGames": 3
    },
    {
      "gamesPlayerA": [
        0,
        1,
        1,
        0,
        0
      ],
      "gamesPlayerB": [
        1,
        0,
        0,
        1,
        1
      ],
      "maxGamesPerSet": 5,
      "playerAWins": false,
      "playerBWins": true,
      "playerAGames": 2,
      "playerBGames": 3
    },
    {
      "gamesPlayerA": [
        0,
        1,
        0,
        1,
        0
      ],
      "gamesPlayerB": [
        1,
        0,
        1,
        0,
        1
      ],
      "maxGamesPerSet": 5,
      "playerAWins": false,
      "playerBWins": true,
      "playerAGames": 2,
      "playerBGames": 3
    },
    {
      "gamesPlayerA": [
        0,
        1,
        1,
        0,
        0
      ],
      "gamesPlayerB": [
        1,
        0,
        0,
        0,
        0
      ],
      "maxGamesPerSet": 5,
      "playerAWins": false,
      "playerBWins": false,
      "playerAGames": 2,
      "playerBGames": 1
    }
  ],
  "gamesTotalA": 8,
  "gamesTotalB": 10,
  "leaguesTotalA": 0,
  "leaguesTotalB": 3
}
```