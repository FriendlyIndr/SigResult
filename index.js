var ctx = document.getElementById('signalChart').getContext('2d');
var chart;
var resultant = document.getElementById('resultant');

var x_axis = new Array(101);
var x_axis_labels = new Array(101);
for(i = 0; i <= 100; i++){
    x_axis_labels[i] = i - 50;                     //programmatically populating the labels array
}
for(i = 0; i <= 100; i++){
    x_axis[i] = 0;                                 //setting the dataset to zero
}

function impulse(){
    var ui_coeff = parseInt(document.getElementById('ui_coeff').value);
    var ui_shift = parseInt(document.getElementById('ui_shift').value);

    for(i = 0; i <= 100; i++){
        if(i - 50 == -ui_shift){
            x_axis[i] += ui_coeff;
        }
        else {
            x_axis[i] += 0;
        }
    }

    graph();
    resultant.textContent += '+(' + ui_coeff + 'δ(t+' + ui_shift + ')) ';
    
}

function step(){
    var us_coeff = parseInt(document.getElementById('us_coeff').value);
    var us_shift = parseInt(document.getElementById('us_shift').value);
    for(i = 0; i <= 100; i++){
        if(i - 50 >= -us_shift){
            x_axis[i] += us_coeff;
        }
        else {
            x_axis[i] += 0;
        }
    }

    graph();
    resultant.textContent += '+(' + us_coeff + 'u(t+' + us_shift + ')) ';
}

function ramp(){
    var ur_coeff = parseInt(document.getElementById('ur_coeff').value);
    var ur_shift = parseInt(document.getElementById('ur_shift').value);
    slope = 0;
    for(i = 0; i <= 100; i++){
        if(i - 50 > -ur_shift + 1){
            slope++;
            x_axis[i] += slope*ur_coeff;
        }
        else{
            x_axis[i] += 0;
        }
    }

    graph();
    resultant.textContent += '+(' + ur_coeff + 'γ(t+' + ur_shift + ')) ';
}

function reset(){
    resultant.textContent = '';
    chart.destroy();
    for(i = 0; i <= 100; i++){
        x_axis[i] = 0;
    }
}

function graph(){
    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'scatter', // Line chart type
        data: {
            labels: x_axis_labels,
            datasets: [{
                label: 'Resultant Signal', 
                data: x_axis, 
                borderColor: 'blue', 
                borderWidth: 2, 
                fill: false 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'X-axis'
                    },
                    min: -50,
                    max: 50
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Y-axis'
                    },
                    min: -10,
                    max: 10
                }
            }
        }
    });

    const containerBody = document.querySelector('.containerBody');

    containerBody.style.width = '2500px';
}
