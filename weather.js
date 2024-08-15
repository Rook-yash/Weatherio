const url = `http://api.openweathermap.org/data/2.5/weather?q=`
const key = "acae2b40d282843963b559c1dec3f175";
apibana('New Delhi');
let lat ;
let lon ;
let same = [] ;
const url2 = `http://api.openweathermap.org/data/2.5/weather?`

const search = document.getElementById('Search');
search.addEventListener('keypress' , (e)=>{
    if(e.key === 'Enter'){
        apibana(search.value);
        apibana_forecast(search.value);
        document.querySelector('.weather-left-4')
        .style.display = 'none';
    }
})


async function apibana(query){
    const weather = await fetch(`${url}${query}&units=metric&appid=${key}`);
    const data =  await weather.json();
    const queryy = query ;
    console.log(data);
    console.log(queryy);
    puttingdata(data);
}
async function apibana2(){
    const weather = await fetch(`${url2}lat=${lat}&lon=${lon}&units=metric&appid=${key}`);
    const data = await weather.json();
    puttingdata(data);
    search.value = '';
}
function puttingdata(data ){
    
    const days = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const date = new Date();
    const Todate = date.getDate();
    const month = date.getMonth();
    const day = date.getDay();
    const time = date.getHours();
    console.log(time + ' ' + Todate + ' ' + (month + 1));

    document.querySelector('.temperature')
    .innerHTML = data.main.temp;
    document.querySelector('.weather-type')
    .innerHTML = data.weather[0].main;
    document.querySelector('.place')
    .innerHTML = data.name + ', ' + data.sys.country;
    document.querySelector('.day')
    .innerHTML = days[day] + ' ' + Todate + ', ' + months[month];

    let weather_type =  data.weather[0].main;
    let weather_des = data.weather[0].description;
    if(weather_type === 'Clear'){
        if(time >= 12 && time <= 24){
            document.querySelector('.temp-img')
            .src = 'weather_icons/01d.png';
        }
        else{
            document.querySelector('.temp-img')
            .src = 'weather_icons/01n.png';
        }
    }
    else if(weather_type === 'Clouds'){
        if(weather_des === 'broken clouds'){
            if(time >= 12 && time <= 24){
                document.querySelector('.temp-img')
                .src = 'weather_icons/04d.png';
            }
            else{
                document.querySelector('.temp-img')
                .src = 'weather_icons/04n.png';
            }
        }
        else if(weather_des === 'scattered clouds'){
            if(time >= 12 && time <= 24){
                document.querySelector('.temp-img')
            .src = 'weather_icons/03d.png';
            }
            else{
                document.querySelector('.temp-img')
            .src = 'weather_icons/03n.png';
            }
        }
        else if(weather_des === 'overcast clouds'){
            if(time >= 12 && time <= 24){
                document.querySelector('.temp-img')
                .src = 'weather_icons/04d.png';
            }
            else{
                document.querySelector('.temp-img')
                .src = 'weather_icons/04n.png';
            }
        }
        else{
            if(time >= 12 && time <= 24){
                document.querySelector('.temp-img')
                .src = 'weather_icons/02d.png';
            }
            else{
                document.querySelector('.temp-img')
                .src = 'weather_icons/02n.png';
            }
        }
    }
    else if(weather_type === 'Drizzle'){
        document.querySelector('.temp-img')
        .src = 'weather_icons/09d.png';
    }
    else if(weather_type === 'Rain'){
        if(weather_des === 'light intensity shower rain' 
        || weather_des === 'shower rain' 
        || weather_des === 'heavy intensity shower rain'
        || weather_des === 'ragged shower rain'){
            if(time >= 12 && time <= 24){
                document.querySelector('.temp-img')
                .src = 'weather_icons/09d.png';
            }
            else{
                document.querySelector('.temp-img')
                .src = 'weather_icons/09n.png';
            }
        }
        else{
            if(time >= 12 && time <= 24){
                document.querySelector('.temp-img')
                .src = 'weather_icons/10d.png';
            }
            else{
                document.querySelector('.temp-img')
                .src = 'weather_icons/10n.png';
            }
        }
    }
    else if(weather_type === 'Thunderstorm'){
        if(time >= 12 && time <= 24){
            document.querySelector('.temp-img')
            .src = 'weather_icons/11d.png';
        }
        else{
            document.querySelector('.temp-img')
            .src = 'weather_icons/11n.png';
        }
    }
    else if(weather_type === 'Snow' || weather_des === 'freezing rain'){
        if(time >= 12 && time <= 24){
            document.querySelector('.temp-img')
            .src = 'weather_icons/13d.png';
        }
        else{
            document.querySelector('.temp-img')
            .src = 'weather_icons/13n.png';
        }
    }
    else{
        if(time >= 12 && time <= 24){
            document.querySelector('.temp-img')
            .src = 'weather_icons/50d.png';
        }
        else{
            document.querySelector('.temp-img')
            .src = 'weather_icons/50n.png';
        }
    }

    document.getElementById('hum-per')
    .innerHTML = data.main.humidity + '%';

    document.getElementById('pre')
    .innerHTML = data.main.pressure + 'hPa';

    document.getElementById('temp')
    .innerHTML = data.main.feels_like + '&deg;c';

    document.getElementById('dist')
    .innerHTML = data.visibility / 1000 + 'km';

    const rise = data.sys.sunrise ;
    let d = new Date(rise * 1000);

    document.getElementById('rise-time')
    .innerHTML = d.toLocaleTimeString([] , {hour:'2-digit',minute:'2-digit'});

    const set = data.sys.sunset ;
    let s = new Date(set * 1000);
    document.getElementById('set-time')
    .innerHTML = s.toLocaleTimeString([] , {hour:'2-digit',minute:'2-digit'});

    document.querySelector('.time')
    .innerHTML.toUpperCase();

    lat = data.coord.lat;
    lon = data.coord.lon;
    air();
    const hourlyupdate_url = `https://api.open-meteo.com/v1/bom?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,temperature_80m,temperature_180m&timezone=auto&forecast_days=1`;
    wind(hourlyupdate_url);
}

const forecast_url = 'http://api.openweathermap.org/data/2.5/forecast?appid=';
apibana_forecast('New Delhi');
async function apibana_forecast(query){
    const forecast_info = await fetch(`${forecast_url}${key}&q=${query}&units=metric`);
    const forecast_data = await forecast_info.json();
    console.log(forecast_data);
    putting_forecast_data(forecast_data);
}
async function apibana_forecast2(){
    const forecast_info = await fetch(`${forecast_url}${key}&lat=${lat}&lon=${lon}&units=metric`);
    const forecast_data = await forecast_info.json();
    putting_forecast_data(forecast_data);
}
function putting_forecast_data(forecast_data){

    const d = new Date();
    const date = d.getDate();
    const da = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];
    const mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let arr = [] ;

    forecast_data.list.forEach((item,index) => {

        let fore_date = forecast_data.list[index].dt;
        let fore_real_date = new Date(fore_date * 1000);
        const ac_date = fore_real_date.getUTCDate();
        const ac_month = fore_real_date.getUTCMonth();
        const ac_day = fore_real_date.getDay();

        if(ac_date !== date && ac_date > date){
            arr.push(
                {
                    temp : forecast_data.list[index].main.temp ,
                    max : forecast_data.list[index].main.temp_max ,
                    min : forecast_data.list[index].main.temp_min ,
                    date : ac_date ,
                    dayy : ac_day ,
                    month : ac_month ,
                    main : forecast_data.list[index].weather[0].main,
                    des : forecast_data.list[index].weather[0].description ,
                    icon : forecast_data.list[index].weather[0].icon
                }
            );
        }
        
    });
    console.log(arr);
    let value ;

    let max1 = Number.NEGATIVE_INFINITY;
    for(let i = 0 ; i < 8 ; i++){
        if(max1 < arr[i].max){
            max1 = arr[i].max;
        }
    }
    let min1 = Number.POSITIVE_INFINITY;
    for(let i = 0 ; i < 8 ; i++){
        if(min1 > arr[i].min){
            min1 = arr[i].min;
        }
    }

    console.log(max1 + ' , ' + min1);

    let max2 = Number.NEGATIVE_INFINITY;
    for(let i = 8 ; i < 16 ; i++){
        if(max2 < arr[i].max){
            max2 = arr[i].max;
        }
    }
    let min2 = Number.POSITIVE_INFINITY;
    for(let i = 8 ; i < 16 ; i++){
        if(min2 > arr[i].min){
            min2 = arr[i].min;
        }
    }

    console.log(max2 + ' , ' + min2);

    let max3 = Number.NEGATIVE_INFINITY;
    for(let i = 16 ; i < 24 ; i++){
        if(max3 < arr[i].max){
            max3 = arr[i].max;
        }
    }
    let min3 = Number.POSITIVE_INFINITY;
    for(let i = 16 ; i < 24 ; i++){
        if(min3 > arr[i].min){
            min3 = arr[i].min;
        }
    }

    console.log(max3 + ' , ' + min3);
    let countmax = 0 ;
    let max4 = Number.NEGATIVE_INFINITY;
    for(let i = 24 ; i < arr.length ; i++){
        countmax++;
        if(max4 < arr[i].max){
            max4 = arr[i].max;
        }
        if(countmax > 8){
            break;
        }
    }
    let min4 = Number.POSITIVE_INFINITY;
    let countmin = 0 ;
    for(let i = 24 ; i < arr.length ; i++){
        countmin++;
        if(min4 > arr[i].min){
            min4 = arr[i].min;
        }
        if(countmin > 8){
            break;
        }
        value = i + 1 ;
    }

    console.log(max4 + ' , ' + min4);

    let max5 = Number.NEGATIVE_INFINITY;
    let min5 = Number.POSITIVE_INFINITY;
    if(value < arr.length){
        
        for(let i = 32 ; i < arr.length ; i++){
            if(max5 < arr[i].max){
                max5 = arr[i].max;
            }
        }
        
        for(let i = 32 ; i < arr.length ; i++){
            if(min5 > arr[i].min){
                min5 = arr[i].min;
            }
        }
        
    }
    console.log(max5 + ' , ' + min5);
    

    if(max1 !== Number.NEGATIVE_INFINITY && min1 !== Number.POSITIVE_INFINITY){
        document.getElementById('fore-temp-1')
        .innerHTML = Math.round((min1)) + '/' + Math.round((max1));
    }
    if(max2 !== Number.NEGATIVE_INFINITY && min2 !== Number.POSITIVE_INFINITY){
        document.getElementById('fore-temp-2')
        .innerHTML = Math.round((min2) ) + '/' + Math.round((max2));
    }
    if(max3 !== Number.NEGATIVE_INFINITY && min3 !== Number.POSITIVE_INFINITY){
        document.getElementById('fore-temp-3')
        .innerHTML = Math.round((min3) ) + '/' + Math.round((max3) );
    }
    if(max4 !== Number.NEGATIVE_INFINITY && min4 !== Number.POSITIVE_INFINITY){
        document.getElementById('fore-temp-4')
        .innerHTML = Math.round((min4) ) + '/' + Math.round((max4));
    }
    if(max5 !== Number.NEGATIVE_INFINITY && min5 !== Number.POSITIVE_INFINITY){
        document.getElementById('fore-temp-5')
        .innerHTML = Math.round((min5)) + '/' + Math.round((max5));
    }
    else{
        document.getElementById('forecast-5')
        .style.display = 'none';
        document.querySelector('.weather-left')
        .style.gap = '2rem';
        document.querySelector('.weather-left-2')
        .innerHTML = '4 Days forecast';
    }

    const days = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const today = new Date();
    let date_count = 0 ;
    document.querySelectorAll('.date-mon')
    .forEach((item,index) => {
        item.innerHTML = arr[date_count].date + ' ' + months[arr[date_count].month];
        date_count = (date_count) + 8 ;
        if(date_count >= arr.length){
            date_count = arr.length - 1;
        }
    })
    let day_count = 0 ;
    document.querySelectorAll('.dayy')
    .forEach((item,index) => {
        item.innerHTML = days[arr[day_count].dayy];
        day_count = (day_count) + 8 ;
        if(day_count >= arr.length){
            day_count = arr.length - 1;
        }
    })

    let i = 0 ;
    const dat = new Date();
    const time = dat.getHours();
    console.log(time +'bcc' ) ;

    console.log(same);
    
    let arr1 = []
    for(let i = 0 ; i < 8 ; i++){
        arr1[i] = arr[i];
    }
    console.log(arr1);
    let arr2 = []
    for(let i = 0 ; i < 8 ; i++){
        arr2[i] = arr[i + 8];
    }
    console.log(arr2);

    let arr3 = []
    for(let i = 0 ; i < 8 ; i++){
        arr3[i] = arr[i + 16];
    }
    console.log(arr3);

    let arr4 = []
    for(let i = 0 ; i < 8 ; i++){
        let index = i + 24 ;
        if(index < arr.length){
            arr4[i] = arr[index];
        }
    }
    console.log(arr4);

    let arr5 = []
    for(let i = 0 ; i < 8 ; i++){
        let index = i + 32 ;
        if(index < arr.length){
            arr5[i] = arr[i + 32];
        }
    }
    console.log(arr5);

    console.log(time);
    if(time >= 0 && time < 3){
        fore_img(0 , 0);
        disp(1);
        des_main(0 ,arr1,arr2,arr3,arr4,arr5);
    }
    else if(time >= 3  && time < 6){
        fore_img(1 , 0);
        disp(2);
        des_main(1,arr1,arr2,arr3,arr4,arr5);
    }
    else if(time >= 6 && time < 9){
        fore_img(2 , 0);
        disp(3);
        des_main(2,arr1,arr2,arr3,arr4,arr5);
    }
    else if(time >= 9 && time < 12){
        fore_img(3 , 0);
        disp(4);
        des_main(3,arr1,arr2,arr3,arr4,arr5);
    }
    else if(time >= 12 && time < 15){
        fore_img(4 , 0);
        disp(5);
        des_main(4,arr1,arr2,arr3,arr4,arr5);
    }
    else if(time >= 15 && time < 18){
        fore_img2(5 , 0);
        disp(6);
        des_main(5,arr1,arr2,arr3,arr4,arr5);
    }
    else if(time >= 18 && time < 21){
        fore_img2(6 , 0);
        disp(7);
        des_main(6,arr1,arr2,arr3,arr4,arr5);
    }
    else{
        fore_img2(7 , 0);
        disp(8);
        des_main(7,arr1,arr2,arr3,arr4,arr5);
    }

    function fore_img(num , num2){
        document.getElementById(`fore-img-${num2 +1}`)
        .src = `weather_icons/${arr1[num].icon}.png`;
        document.getElementById(`fore-img-${num2 +2}`)
        .src = `weather_icons/${arr2[num].icon}.png`;
        document.getElementById(`fore-img-${num2 +3}`)
        .src = `weather_icons/${arr3[num].icon}.png`;
        document.getElementById(`fore-img-${num2 +4}`)
        .src = `weather_icons/${arr4[num].icon}.png`;
        if(num < arr5.length){
            document.getElementById(`fore-img-${num2 +5}`)
            .src = `weather_icons/${arr5[num].icon}.png`;
        }
    }
    function fore_img2(num , num2){
        document.getElementById(`fore-img-${num2 +1}`)
        .src = `weather_icons/${arr1[num].icon}.png`;
        document.getElementById(`fore-img-${num2 +2}`)
        .src = `weather_icons/${arr2[num].icon}.png`;
        document.getElementById(`fore-img-${num2 +3}`)
        .src = `weather_icons/${arr3[num].icon}.png`;
        if(arr4.length > 7){
            document.getElementById(`fore-img-${num2 +4}`)
            .src = `weather_icons/${arr4[num].icon}.png`;
        }
        if(arr5.length > 7){
            document.getElementById(`fore-img-${num2 +5}`)
            .src = `weather_icons/${arr5[num].icon}.png`;
        }
    }
    function disp(num){
        if(arr5.length === num){
            document.getElementById('forecast-5')
            .style.display = 'block';
            document.querySelector('.weather-left-2')
            .innerHTML = '5 Days forecast'
        }
    }

    function des_main(num,arr1,arr2,arr3,arr4,arr5){
        document.getElementById(`main-p-${1}`)
        .innerHTML = arr1[num].main;
        document.getElementById(`main-p-${2}`)
        .innerHTML = arr2[num].main;
        document.getElementById(`main-p-${3}`)
        .innerHTML = arr3[num].main;
        document.getElementById(`main-p-${4}`)
        .innerHTML = arr4[num].main;
        if(num < arr5.length){
            document.getElementById(`main-p-${5}`)
            .innerHTML = arr5[num].main;
        }
    }
}

// console.log(lat);
const air_url = 'http://api.openweathermap.org/data/2.5/air_pollution?lat='
// air('New Delhi');
async function air(query){
    const air_info = await fetch(`${air_url}${lat}&lon=${lon}&appid=${key}`);
    const data_air = await air_info.json();
    console.log(data_air);
    putting_air(data_air);
}
function putting_air(data_air){
    document.getElementById('pm')
    .innerHTML = data_air.list[0].components.pm2_5 ;

    document.getElementById('so')
    .innerHTML = data_air.list[0].components.so2 ;

    document.getElementById('no')
    .innerHTML = data_air.list[0].components.no2 ;

    document.getElementById('o')
    .innerHTML = data_air.list[0].components.o3 ;

    console.log(data_air.list[0].main.aqi + 'aqi');

    if(data_air.list[0].main.aqi === 1){
        document.querySelector('.rate')
        .classList.add('color1');
        document.querySelector('.rate')
        .innerHTML = 'Good';
    }
    else if(data_air.list[0].main.aqi === 2){
        document.querySelector('.rate')
        .classList.add('color2');
        document.querySelector('.rate')
        .innerHTML = 'Fair';
    }
    else if(data_air.list[0].main.aqi === 3){
        document.querySelector('.rate')
        .classList.add('color3');
        document.querySelector('.rate')
        .innerHTML = 'Moderate';
    }
    else if(data_air.list[0].main.aqi === 4){
        document.querySelector('.rate')
        .classList.add('color4');
        document.querySelector('.rate')
        .innerHTML = 'Poor';
    }
    else{
        document.querySelector('.rate')
        .classList.add('color5');
        document.querySelector('.rate')
        .innerHTML = 'Very Poor';
    }
    for(let i = 1 ; i < 6 ; i++){
        if(i === data_air.list[0].main.aqi){
            continue;
        }
        document.querySelector('.rate')
        .classList.remove(`color${i}`);
    }
}

async function wind(hourlyupdate_url){
    const wind_info = await fetch(hourlyupdate_url);
    const wind_data = await wind_info.json();
    console.log(wind_data);
    putting_wind(wind_data);
}

function putting_wind(wind_data){

    const date = new Date();
    const time = date.getHours();
    console.log(time);

    // document.querySelector('.temperature')
    // .innerHTML = wind_data.hourly.temperature_2m[time];

    let i = 0 ; 
    document.querySelectorAll('.today-degree')
    .forEach((item , index) => {
        item.innerHTML = wind_data.hourly.temperature_2m[i] + ' &deg;c';
        i = i + 3 ;
    });
    i = 0 ;
    document.querySelectorAll('.today-speed')
    .forEach((item,index) => {
        item.innerHTML = wind_data.hourly.wind_speed_10m[i] + ' km/h';
        i = i + 3 ;
    });
    i = 0 ;
    const wind_date = new Date();
    const wind_time = wind_date.getHours();;
    
    document.querySelectorAll('.today-img')
    .forEach((item , index) => {
        let code = wind_data.hourly.weather_code[i] ;
        if(index < 2 || index >5){
            if(code === 0){
                item.src = `weather_icons/01n.png`;
            }
            else if(code === 1 ){
                item.src = `weather_icons/02n.png`;
            }
            else if(code === 2 ){
                item.src = `weather_icons/03n.png`;
            }
            else if(code === 3 ){
                item.src = `weather_icons/04n.png`;
            }
            else if (code === 45 || code === 48){
                item.src = 'weather_icons/50d.png';
            }
            else if (code === 51 || code === 53 || code === 55){
                item.src = 'weather_icons/09d.png';
            }
            else if (code === 56 || code === 57 ){
                item.src = 'weather_icons/09d.png';
            }
            else if (code === 61 || code === 63 || code === 65 ){
                item.src = 'weather_icons/10d.png';
            }
            else if (code === 66 || code === 67 ){
                item.src = 'weather_icons/13d.png';
            }
            else if (code === 71 || code === 73 || code === 75 || code === 77){
                item.src = 'weather_icons/13d.png';
            }
            else if (code === 80 || code === 81 || code === 82){
                item.src = 'weather_icons/09d.png';
            }
            else if (code === 85 || code === 86 ){
                item.src = 'weather_icons/13d.png';
            }
            else{
                item.src = 'weather_icons/11d.png';
            }
        }
        else{
            if(code === 0){
                item.src = `weather_icons/01d.png`;
            }
            else if(code === 1 ){
                item.src = `weather_icons/02d.png`;
            }
            else if(code === 2 ){
                item.src = `weather_icons/03d.png`;
            }
            else if(code === 3 ){
                item.src = `weather_icons/04d.png`;
            }
            else if (code === 45 || code === 48){
                item.src = 'weather_icons/50d.png';
            }
            else if (code === 51 || code === 53 || code === 55){
                item.src = 'weather_icons/09d.png';
            }
            else if (code === 56 || code === 57 ){
                item.src = 'weather_icons/09d.png';
            }
            else if (code === 61 || code === 63 || code === 65 ){
                item.src = 'weather_icons/10d.png';
            }
            else if (code === 66 || code === 67 ){
                item.src = 'weather_icons/13d.png';
            }
            else if (code === 71 || code === 73 || code === 75 || code === 77){
                item.src = 'weather_icons/13d.png';
            }
            else if (code === 80 || code === 81 || code === 82){
                item.src = 'weather_icons/09d.png';
            }
            else if (code === 85 || code === 86 ){
                item.src = 'weather_icons/13d.png';
            }
            else{
                item.src = 'weather_icons/11d.png';
            }
        }
        i = i + 3 ;
    });

    i = 0 ; 
    document.querySelectorAll('.today-icon')
    .forEach((item,index) => {
        item.style.transform = `rotate(${wind_data.hourly.wind_direction_10m[i]}deg)`;
        i = i + 3 ;
    })
}

document.querySelector('.rate')
.addEventListener('click' , () => {
    document.querySelector('.weather-left-4')
    .style.display = 'block';
    const rate  = document.querySelector('.rate').innerHTML;
    for(let i = 1 ; i < 6 ; i++){
        document.querySelector('.type')
        .classList.remove(`color${i}`);
    }
    if(rate === 'Good'){
        document.querySelector('.head-type')
        .innerHTML = 'Good';
        document.querySelector('.para-type')
        .innerHTML = 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
        document.querySelector('.type')
        .classList.add('color1');
    }
    else if(rate === 'Fair'){
        document.querySelector('.head-type')
        .innerHTML = 'Fair';
        document.querySelector('.para-type')
        .innerHTML = 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
        document.querySelector('.type')
        .classList.add('color2');
    }
    else if(rate === 'Moderate'){
        document.querySelector('.head-type')
        .innerHTML = 'Moderate';
        document.querySelector('.para-type')
        .innerHTML = 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
        document.querySelector('.type')
        .classList.add('color3');
    }
    else if(rate === 'Poor'){
        document.querySelector('.head-type')
        .innerHTML = 'Poor';
        document.querySelector('.para-type')
        .innerHTML = 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
        document.querySelector('.type')
        .classList.add('color4');
    }
    else{
        document.querySelector('.head-type')
        .innerHTML = 'Very Poor';
        document.querySelector('.para-type')
        .innerHTML = 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
        document.querySelector('.type')
        .classList.add('color5');
    }
})

document.querySelector('.current-location')
.addEventListener('click' , () => {
    getloc();
})
async function getloc(){
    const loco = await fetch(navigator.geolocation.getCurrentPosition(onSuccess, onError));
    console.log(loco);
}
function onSuccess(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude ;
    air();
    apibana2();
    apibana_forecast2();
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
}
function onError(){
    console.log('Failed');
}