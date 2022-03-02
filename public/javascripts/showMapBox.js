mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: foundCamp.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

// map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(foundCamp.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${foundCamp.title}</h3><p>${foundCamp.location}</p>`
            )
    )
    .addTo(map)