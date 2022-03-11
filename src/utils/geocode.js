const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZW9sb3NlbnNlaSIsImEiOiJja2k5N2xidHMwY3prMnlvNXhhNG10d3YzIn0.5HW9AzWj-uArcBUUuAEiGQ&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Imposible conectar con el servicio de localización!')
        } else if (body.features.length === 0) {
            callback('La ubicación que solicitas no existe. Prueba a buscar otra cosa!')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode