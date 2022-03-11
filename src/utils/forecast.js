const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=02fed49ba8d3e6291103ff7af84bf451&units=m&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Imposible conectar con el servicio meteorológico!')
        } else if (body.error) {
            callback('Imposible encontrar la ubicación!')
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                string: body.current.weather_descriptions[0] + '. Ahora mismo hay ' + body.current.temperature + ' grados. La sensación térmica es de ' + body.current.feelslike + ' grados.'
            })
        }
    })
}


module.exports = forecast