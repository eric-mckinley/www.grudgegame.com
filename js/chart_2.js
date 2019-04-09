
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
