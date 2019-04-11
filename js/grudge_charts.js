
function createChart1(ctx, data) {

    var gameProgressionA = [];
    gameProgressionA.push(0);
    var gameProgressionB = [];
    gameProgressionB.push(0);
    var gameNames = [];
    gameNames.push(' ');

    for (var i = 0, gi = 0; i < data.matches.length; i += 1, gi += 1) {
        if (data.matches[i].scorePlayerA > data.matches[i].scorePlayerB) {
            gameProgressionA.push(gameProgressionA.slice(-1)[0] + 1);
            gameProgressionB.push(gameProgressionB.slice(-1)[0]);
        }
        else {
            gameProgressionA.push(gameProgressionA.slice(-1)[0]);
            gameProgressionB.push(gameProgressionB.slice(-1)[0] + 1);
        }
        gameNames.push('G' + (i + 1));
    }

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: gameNames,

            datasets: [{
                label: data.playerA,
                steppedLine: false,
                borderColor: '#' + data.config.colorA,
                backgroundColor: '#' + data.config.colorA,
                data: gameProgressionA,
                fill: false
            }, {
                label: data.playerB,
                borderColor: '#' + data.config.colorB,
                backgroundColor: '#' + data.config.colorB,
                steppedLine: false,
                data: gameProgressionB,
                fill: false
            }]
        }
        ,
        options: {
            title: {
                display: true,
                text: 'Win Progression'
            }
        }
    });
    return 'Game Win Progression';
}


function createChart2(ctx, data) {

    var winStreakPlayerA = 0;
    var winStreakPlayerB = 0;
    var currentWinStreakPlayerA = 0;
    var currentWinStreakPlayerB = 0;

    for (var i = 0; i < data.matches.length; i += 1) {
        if (data.matches[i].scorePlayerA > data.matches[i].scorePlayerB) {
            currentWinStreakPlayerA++;
            winStreakPlayerA = Math.max(currentWinStreakPlayerA, winStreakPlayerA);
            currentWinStreakPlayerB = 0;
        }
        else {
            currentWinStreakPlayerB++;
            winStreakPlayerB = Math.max(currentWinStreakPlayerB, winStreakPlayerB);
            currentWinStreakPlayerA = 0;
        }
    }

    var horizontalBarChartData = {
        labels: ['Games'],
        datasets: [{
            label: data.playerA,
            borderColor: '#' + data.config.colorA,
            backgroundColor: '#' + data.config.colorA,
            borderWidth: 1,
            data: [
                winStreakPlayerA, 0
            ]
        }, {
            label: data.playerB,
            borderColor: '#' + data.config.colorB,
            backgroundColor: '#' + data.config.colorB,
            data: [
                winStreakPlayerB, 0
            ]
        }]

    };

    var winStreakChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: horizontalBarChartData,
        options: {
            elements: {
                rectangle: {
                    borderWidth: 2
                }
            },
            responsive: true,
            legend: {
                position: 'right'
            },
            title: {
                display: true,
                text: 'Longest Win Streak'
            }
        }
    });
    return 'Best Winning Streak';
}

function createChart3(ctx, data) {

    var gamesTotalA = 0;
    var gamesTotalB = 0;

    for (var i = 0; i < data.matches.length; i += 1) {
        if (data.matches[i].scorePlayerA > data.matches[i].scorePlayerB) {
            gamesTotalA++;
        }
        else {
            gamesTotalB++;
        }
    }

    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                backgroundColor: ['#' + data.config.colorA, '#' + data.config.colorB],
                data: [gamesTotalA, gamesTotalB]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                data.playerA,
                data.playerB
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Games Won'
            }
        }
    });
    return 'Overall Game Wins';
}

function createChart4(ctx, data) {

    var playerAGameWinPercent = Math.round((data.gamesTotalA * 100.0) / (data.gamesTotalA + data.gamesTotalB));
    var playerBGameWinPercent = 100 - playerAGameWinPercent;
    var playerALeaguesWinPercent = Math.round((data.leaguesTotalA * 100.0) / (data.leaguesTotalA + data.leaguesTotalB));
    var playerBLeaguesWinPercent = 100 - playerALeaguesWinPercent;


    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['Game Wins %', 'Set Wins %'],
            datasets: [
                {
                    label: data.playerA,
                    data: [playerAGameWinPercent, playerALeaguesWinPercent],
                    backgroundColor: '#' + data.config.colorA,
                },
                {
                    label: data.playerB,
                    data: [playerBGameWinPercent, playerBLeaguesWinPercent],
                    backgroundColor: '#' + data.config.colorB,
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
            }
        }
    });
    return 'Win Percentage';
}
