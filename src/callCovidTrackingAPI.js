export default
function callCovidTracking() {
   return fetch(`https://covidtracking.com/api/v1/states/current.json`)
   .then(res => {
       return res.json()
   });
}
