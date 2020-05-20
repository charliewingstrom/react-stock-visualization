import React from 'react';
import callAlphaVenture from './callAlphaVentureAPI.js';
import Chart from '../node_modules/chart.js/dist/Chart.bundle.js';

export default 
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockCode: 'AAPL',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
       
        var tmp = callAlphaVenture(this.state.stockCode, '5min');
        tmp.then(data => {
            var chartData = data['Time Series (Daily)'];
            
            var dates = [];
            var openingValues = []
            for (const [key, value] of Object.entries(chartData)) {
                dates.push(key);
                // getting the opening value for the day
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
                    labels: chartDataArray[0].reverse(),
                    datasets: [{
                        label: 'Price',
                        data: chartDataArray[1].reverse(),
                        backgroundColor: 
                            'rgba(255, 99, 132, 0.2)',
                        
                        borderColor: 
                            'rgba(255, 99, 132, 1)',

                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                            }
                        }]
                    }
                }
            });
        })
        .catch(err => console.log("there was an error: " + err));
    }

    handleChange(event) {
        this.setState({stockCode: event.target.value});
      }
    handleSubmit(event) {
        event.preventDefault();
        this.componentDidMount();
    }
    render() {
        return (
            <div className={'page'}>
                <h1>This is a starter page.</h1>
                <h3>The stock is {this.state.stockCode}</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter a Code:
                        <input type="text" value={this.state.stockCode} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
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