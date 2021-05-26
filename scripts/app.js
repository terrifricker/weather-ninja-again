const cityForm = document.querySelector('form');
const card = document.querySelector(".card");
const details = document.querySelector(".details");


const updateUI = ( (data) => {

    //const cityDetails = data.cityDetails;
    //const weatherDetails = data.weatherDetails;

    // Use javascript Destructuring instead
    const {cityDetails, weatherDetails} = data;

    details.innerHTML = `
    <div class="city-name">${cityDetails.EnglishName}</div>
    <div class="weather-condition">${weatherDetails.WeatherText}</div>
    <div class="temperature">
        <span class="${weatherDetails.Temperature.Imperial.Value}"></span>
        <span>&deg; F</span>
    </div>`;
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