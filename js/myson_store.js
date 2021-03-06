var storeURL = 'https://api.myjson.com/bins';

function createScores(data, callbackSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', storeURL, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            var created = JSON.parse(xhr.responseText);
            var n = created.uri.lastIndexOf("/");
            var binId = created.uri.substr(n + 1);
            console.log("Created league store: " + binId);
            window.open('?matchId=' + binId);
        }
    };
    xhr.send(JSON.stringify(data));
}


function getScore(binId, callbackSuccess, callbackFailure) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', storeURL + '/' + binId, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var storeData = JSON.parse(xhr.responseText);
            callbackSuccess(binId, convertData(storeData));
        }
        else if (xhr.readyState === 4) {
            callbackFailure();
        }
    };
    xhr.send();
}

function addScore(binId, scoreA, scoreB, callbackSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', storeURL + '/' + binId, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var storeData = JSON.parse(xhr.responseText);
            storeData.matches.push({"scorePlayerA": scoreA, "scorePlayerB": scoreB});
            saveScores(binId, storeData);
            callbackSuccess(binId, convertData(storeData));
        }
    };
    xhr.send();
}

function removeScore(binId, callbackSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', storeURL + '/' + binId, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var storeData = JSON.parse(xhr.responseText);
            storeData.matches.pop();
            saveScores(binId, storeData);
            callbackSuccess(binId, convertData(storeData));
        }
    };
    xhr.send();
}

function saveScores(binId, storeData) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', storeURL + '/' + binId, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var saved = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(storeData));
}


function convertData(storeData) {

    var converted = JSON.parse(JSON.stringify(storeData)); //deepcopy
    converted.leagues = [];
    converted.gamesTotalA = 0;
    converted.gamesTotalB = 0;
    converted.leaguesTotalA = 0;
    converted.leaguesTotalB = 0;

    var maxGamesPerSet = (storeData.config.winMatchesForSet * 2) - 1;
    var winMatchesForSet = storeData.config.winMatchesForSet;
    var matches = storeData.matches;

    var currentGameWinsPlayerA = 0;
    var currentGameWinsPlayerB = 0;

    var league = createLeague(maxGamesPerSet);

    for (var i = 0, gi = 0; i < matches.length; i += 1, gi += 1) {
        if (matches[i].scorePlayerA > matches[i].scorePlayerB) {
            converted.gamesTotalA = converted.gamesTotalA + 1;

            currentGameWinsPlayerA++;

            league.gamesPlayerA[gi] = 1;
            if (winMatchesForSet === currentGameWinsPlayerA) {

                league.playerAWins = true;
                league.playerAGames = currentGameWinsPlayerA;
                league.playerBGames = currentGameWinsPlayerB;
                converted.leaguesTotalA = converted.leaguesTotalA + 1;

                converted.leagues.push(league);
                league = createLeague(maxGamesPerSet);
                gi = -1;
                currentGameWinsPlayerA = 0;
                currentGameWinsPlayerB = 0;
            }
        }
        else {
            converted.gamesTotalB = converted.gamesTotalB + 1;

            currentGameWinsPlayerB++;

            league.gamesPlayerB[gi] = 1;
            if (winMatchesForSet === currentGameWinsPlayerB) {
                league.playerBWins = true;
                league.playerAGames = currentGameWinsPlayerA;
                league.playerBGames = currentGameWinsPlayerB;

                converted.leaguesTotalB = converted.leaguesTotalB + 1;

                converted.leagues.push(league);
                league = createLeague(maxGamesPerSet);
                gi = -1;
                currentGameWinsPlayerA = 0;
                currentGameWinsPlayerB = 0;
            }
        }
    }
    league.playerAGames = currentGameWinsPlayerA;
    league.playerBGames = currentGameWinsPlayerB;
    converted.leagues.push(league);
    return converted;
}


function createLeague(maxGamesPerSet) {
    var league = {
        gamesPlayerA: createGames(maxGamesPerSet),
        gamesPlayerB: createGames(maxGamesPerSet),
        maxGamesPerSet: maxGamesPerSet,
        playerAWins: false,
        playerBWins: false

};

    return league;
}


function createGames(maxGamesPerSet) {
    var games = [];
    for (var i = 0; i < maxGamesPerSet; i++) {
        games[i] = 0;
    }
    return games;
}
