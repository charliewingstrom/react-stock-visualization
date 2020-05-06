import React from 'react';
import callAlphaVenture from './callAlphaVentureAPI.js';
import Chart from '../node_modules/chart.js/dist/Chart.bundle.js';



export default 
class Page extends React.Component {

    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        var tmp = callAlphaVenture('IBM', '5min');
        tmp.then(data => {
            var chartData = data['Time Series (Daily)'];
            
            var dates = [];
            var openingValues = []
            for (const [key, value] of Object.entries(chartData)) {
                dates.push(key);
                openingValues.push(value['1. open']);
            }
            console.log(dates);
            console.log(openingValues);

            return [dates, openingValues]
        })
        .then(chartDataArray => {
            new Chart(myChartRef, {
                type: 'line',
                data: {
                    labels: chartDataArray[0],
                    datasets: [{
                        label: '# of Votes',
                        data: chartDataArray[1],
                        backgroundColor: 
                            'rgba(255, 99, 132, 0.2)',
                        
                        borderColor: 
                            'rgba(255, 99, 132, 1)',

                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        })

        .catch(err => console.log("there was an error: " + err));

        
    }
    render() {
        
        return (
            <div className={'page'}>
                <h1>This is a starter page.</h1>
                <canvas 
                    id="myChart" 
                    width="400" 
                    height="400"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}