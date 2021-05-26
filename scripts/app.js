// grab form
const cityForm = document.querySelector('form');

const updateCity =  async (city) => {
    console.log(city);
}


cityForm.addEventListener('submit', (e)=> {
    
    // grab city from submitted form
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // add city to detail div on screen
    
    updateCity(city);

})