
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