
 export default
 function callAlphaVenture(stockCode, timeFrame) {
    return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockCode}&apikey=2105D1X8XZN7K357`)
    .then(res => {
        return res.json()
    });
}