const submitBtn = document.getElementById('submit_btn')
const cityName = document.getElementById('cityname')
const city_name = document.getElementById('city_name')

const temp = document.getElementById("org_temp");
const temp_status = document.getElementById("temp_status");

const day = document.getElementById('day');
const date = document.getElementById('date');

const hide = document.querySelector('.box')

const getInfo = async(event) => {
  event.preventDefault();
  const cityVal = cityName.value;

  if (cityVal === "") {
    city_name.innerText = "Enter proper value";
    hide.classList.add("hide_data");
  } else {
      try {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=matrics&appid=80ecc64824b44f6deb4abd1c95f9944a`;
        const responce = await fetch(url);
        const data = await responce.json();
        const arrData = [data];
        temp.innerText = Math.floor(arrData[0].main.temp - 273);
        temp_status.innerText = arrData[0].weather[0].main;
        city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

        let tempMode = arrData[0].weather[0].main;
        if(tempMode == "Clear") {
          temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68'></i>";
        } else if (tempMode == "Clouds") {
          temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6'></i>";
        } else if (tempMode == "Rain") {
          temp_status.innerHTML = "<i class='fas fa-rain' style='color:#a4b0b6'></i>";
        } else if (tempMode == "Haze") {
          temp_status.innerHTML = "<i class='fas fa-smog' style='color:#a4b0b6'></i>";
        } else {
            temp_status.innerHTML = "<i class='fas fa-cloud-sun' style='color:#f1f2f6'></i>";
        }
        hide.classList.remove("hide_data");

      } catch {
        city_name.innerText = `Enter proper value`;
        hide.classList.add("hide_data");
      }
  }
}

let currentDay = new Date();
var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tues";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
// day.innerText = weekday[currentDay.getDay()];
dayToday = weekday[currentDay.getDay()];

var months = new Array();
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var currenTime = new Date();
var month = months[currenTime.getMonth()];
var today = currenTime.getDate();
date.innerText =  `${today} ${month} | ${dayToday}`;

submitBtn.addEventListener('click',getInfo);
