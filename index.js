const Selector = document.getElementById("WeatherStn");
const card = document.querySelector(".card");
const errorMsg = document.getElementById("error");
const tempMsg = document.getElementById("temp");
const roadMsg = document.getElementById("road");
const data = getData();
async function getData(){
    const res = await fetch('https://api.data.gov.sg/v1/environment/air-temperature?date_time=2024-03-05T20:00:00') //use Date object to get current date-time
    return await res.json();
}

console.log(data.then(d => {
    console.log(d);
    console.log(d.metadata.stations);
    
}));

function DisplayError(msg)
{
    tempMsg.textContent ="";
    roadMsg.textContent="";
    errorMsg.textContent =msg;
    card.style.display = "block";

}

function DisplayWeather(value)
{
    console.log(value);
    tempMsg.textContent =String(value)+"°C";
    tempMsg.style.fontWeight ="bold";
    tempMsg.style.fontSize ="3em";
    roadMsg.textContent = Selector.value;
    errorMsg.textContent="";
    card.style.display = "block";

}

function displayWeather()
{
    let id;
    let temp;
    let stn = Selector.value;
    
    if(stn!="Choose one")
    {
        data.then(d=>{
            d.metadata.stations.forEach(element => {
                if(element.name==stn){
                    
                    id = element.id;
                    }
                })
            })
        data.then(d=>{
            d.items[0].readings.forEach(element => {
                if(element.station_id==id)
                {
                    temp = element.value;
                    DisplayWeather(temp);
                }
            })
        })
        
    }
    else{
        DisplayError("Please choose a station");
    }
}
