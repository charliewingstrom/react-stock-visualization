import React from 'react';
import callAlphaVenture from './callAlphaVentureAPI.js';
import Chart from '../node_modules/chart.js/dist/Chart.bundle.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default 
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockCode: 'AAPL',
            myChart: undefined,
            timeSeries: 'TIME_SERIES_DAILY',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeTimeSeries = this.changeTimeSeries.bind(this);
    }
    timeStampData = 
        {'TIME_SERIES_DAILY': 'Time Series (Daily)', 
        'TIME_SERIES_WEEKLY': 'Weekly Time Series' }
    chartRef = React.createRef();

    createChart() {
        if (this.state.myChart) {
            this.state.myChart.destroy();
        }
        const myChartRef = this.chartRef.current.getContext("2d");
       
        var tmp = callAlphaVenture(this.state.stockCode, this.state.timeSeries);
        tmp.then(data => {
            var chartData = data[this.timeStampData[this.state.timeSeries]];
            console.log(data);
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
            this.setState({
                myChart: new Chart(myChartRef, {
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
                }),
            })
            
        })
        .catch(err => console.log("there was an error: " + err));
    }
    
    componentDidMount() {
        this.createChart();
    }

    handleChange(event) {
        this.setState({stockCode: event.target.value});
      }
    handleSubmit(event) {
        event.preventDefault();
        this.componentDidMount();
    }
    changeTimeSeries(event) {
        console.log("The current target value is " + event.currentTarget.value);
        this.setState({
            timeSeries: event.currentTarget.value,
        })
    }
    render() {
        return (
            <div className={'chartPage'}>
                <h1>This is a starter page.</h1>
                <h3>The stock is {this.state.stockCode}</h3>
                <div className={'chartHeader'}>
                    <div className={'headerItem'}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Enter a Code:<br/>
                                <input type="text" value={this.state.stockCode} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div className={'headerItem'}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Time Series [ These don't work yet :'( ]</FormLabel>
                            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                <FormControlLabel
                                value="TIME_SERIES_DAILY"
                                control={<Radio color="primary" />}
                                label="Daily"
                                labelPlacement="top"
                                onChange={this.changeTimeSeries}
                                />
                                <FormControlLabel
                                value="TIME_SERIES_WEEKLY"
                                control={<Radio color="primary" />}
                                label="Weekly"
                                labelPlacement="top"
                                onChange={this.changeTimeSeries}
                                />
                                <FormControlLabel
                                value="TIME_SERIES_MONTHLY"
                                control={<Radio color="primary" />}
                                label="Monthly"
                                labelPlacement="top"
                                onChange={this.changeTimeSeries}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <canvas 
                    padding="5"
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}