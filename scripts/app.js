const cityForm = document.querySelector('form');
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time img");
const icon = document.querySelector(".icon img");


const updateUI = ( (data) => {

    console.log(data);

    //const cityDetails = data.cityDetails;
    //const weatherDetails = data.weatherDetails;

    // Use javascript Destructuring instead
    const {cityDetails, weatherDetails} = data;

    details.innerHTML = `
    <div class="city-name">${cityDetails.EnglishName}</div>
    <div class="weather-condition">${weatherDetails.WeatherText}</div>
    <div class="temperature">
        <span class="current-temperature">${weatherDetails.Temperature.Imperial.Value} </span>
        <span>&deg; F</span>
    </div>`;

    // update image
    let timeSrc = null;
    let timeAlt = null;
    if(weatherDetails.IsDayTime) {
        timeSrc = 'images/day.svg';
        timeAlt = "An image with light blue sky and a few clouds to indicate that it is daytime.";
    } else {
        timeSrc = 'images/night.svg';
        timeAlt = "An image with a navy sky, stars, a crescent moon, and a few dark clouds to indicate that it is nighttime.";
    }
    time.setAttribute("src", timeSrc);
    time.setAttribute("alt", timeAlt);

    // update icon
    const iconSrc =  `images/icons/${weatherDetails.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    // show card
    if(card.classList.contains("hidden")) {
        card.classList.remove("hidden");
    }
})

const updateCity =  async (city) => {

    const cityDetails = await getCity(city)
    const weatherDetails = await getWeather(cityDetails.Key);

    /* using object shorthand notation, because
    the property and value are exactly the same,
    the commented code becomes the new return item.
    return {
        cityDetails: cityDetails,
        weatherDetails: weatherDetails
    }
    */
    return {cityDetails, weatherDetails};
}


cityForm.addEventListener('submit', (e)=> {
    
    // grab city from submitted form
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // add city to detail div on screen
    
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

})