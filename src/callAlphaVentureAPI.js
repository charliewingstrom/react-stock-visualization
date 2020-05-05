
 export default
 function callAlphaVenture(stockCode, timeFrame) {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockCode}&interval=${timeFrame}&apikey=2105D1X8XZN7K357`)
    .then(res => console.log(res.json()))
}