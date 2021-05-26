// grab form
const cityForm = document.querySelector('form');

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
        .then(data => console.log(data))
        .catch(err => console.log(err));

})