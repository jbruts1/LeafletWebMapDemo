var map = L.map('eqmap').setView([20, 0], 2);

//Basemap
var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(basemapUrl, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//USGS Earthquake Feed
var eqUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

//Style Marker based on magnitude
function getColor(mag) {
    return mag > 5 ? '#d73027' :
           mag > 4 ? '#fc8d59' :
           mag > 3 ? '#fee08b' :
           mag > 2 ? '#d9ef8b' :
           mag > 1 ? '#91cf60' :
                     '#1a9850';
}
function getRadius(mag) {
    return mag ? mag * 3 : 2;
}

$.getJSON(eqUrl, function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.properties.mag),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.7
            });
        },
        onEachFeature: function(feature, layer) {
            var time = new Date(feature.properties.time);
            layer.bindPopup(
                "<b>Magnitude:</b> " + feature.properties.mag + "<br>" +
                "<b>Location:</b> " + feature.properties.place + "<br>" +
                "<b>Time:</b> " + time.toUTCString()
            );
        }
    }).addTo(map);
});

//Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend'),
        mags = [0, 1, 2, 3, 4, 5],
        labels = [];

    div.innerHTML += "<b>Magnitude</b><br>";
    for (var i = 0; i < mags.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(mags[i] + 1) + '"></i> ' +
            mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(map);