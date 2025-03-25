let cities = ["القدس" , "مكة" , "القاهرة"];
for (let city of cities) {
    let content = `
      <option>${city}</option>
    `
    document.getElementById('citySelect').innerHTML += content; 
}
document.getElementById('citySelect').addEventListener("change", function(){
    if(this.value == "القدس"){
        GetTimingsCity("القدس","PS");
        document.getElementById('CityName').innerHTML = this.value;
        document.getElementById('NameCity').innerHTML = this.value;
    }else if(this.value == "مكة"){
        GetTimingsCity("مكة","SA");
        document.getElementById('CityName').innerHTML = this.value;
        document.getElementById('NameCity').innerHTML = this.value;
    }else if(this.value == "القاهرة"){
        GetTimingsCity("القاهرة","EG");
        document.getElementById('CityName').innerHTML = this.value;
        document.getElementById('NameCity').innerHTML = this.value;
    }
})
function GetTimingsCity(cityName , countryName){
let param = {
    country : countryName,
    city: cityName,
    method: 5 
}

axios.get('https://api.aladhan.com/v1/timingsByCity',{
    params: param
})
.then(function(response) {
    let timings = response.data.data.timings;
    FillTime('fajrTime',timings.Fajr);
    FillTime('dhuhrTime',timings.Dhuhr);
    FillTime('asrTime',timings.Asr);
    FillTime('sunsetTime',timings.Maghrib);
    FillTime('ishaTime',timings.Isha);
    let readableDate = response.data.data.date.readable;
    let weekDay = response.data.data.date.hijri.weekday.ar;
    let date = weekDay + " " + readableDate;
    document.getElementById('date').innerHTML = date;


})
}
GetTimingsCity("القاهرة","EG")
function FillTime(id , time){
    document.getElementById(id).innerHTML = time;
}