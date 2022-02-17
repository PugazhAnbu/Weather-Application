window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')

    let temperatureSection = document.querySelector('.degree-section')
    let temperatureSpan = document.querySelector('.degree-section span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            
            let appid_key = '2344c59e83911ab6f9f1a43df5b948b5'

            //const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appid_key}`
            console.log(api)

            fetch(api)
                .then(response => {
                return response.json()
            })
                .then(data => {
                console.log(data)
                console.log(data.name, data.main.temp)

                // Set Dom Elements from the API

                temperatureDegree.textContent = data.main.temp
                temperatureDescription.textContent = data.weather[0].description

                locationTimezone.textContent = data.name;

                // Formula for celcius

                let celsius = ~~((data.main.temp - 32) * (5/9));
                setIcons("PARTLY_CLOUDY_DAY", document.querySelector('.icon'))

                //change temperature farenheit to celcius

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C'
                        temperatureDegree.textContent = celsius
                    }else{
                        temperatureSpan.textContent = 'F'
                        temperatureDegree.textContent = data.main.temp
                    }
                })

            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"})

        const currentIcon = icon.replace(/-/g,"_").toUpperCase();

        skycons.play()

        return skycons.set(iconID, Skycons[currentIcon]);
    }
})

