var map = L.map('weathermap').setView([38, -95], 4);
//New Basemap
var basemapUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
var basemapAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>';
var basemap =  L.tileLayer(basemapUrl, {
  attribution: basemapAttrib,
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map)


//add the national precipitation radar layer
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

//add alerts layer
var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
  console.log("Alert severities found:", //a console alert was added since there were any extreme or minor alerts at the time I made this.
    [...new Set(data.features.map(f=>f.properties.severity))]);
    //L.geoJSON(data).addTo(map);
    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'orange';
            if (feature.properties.severity === 'Severe') alertColor = 'red';
            if (feature.properties.severity === 'Extreme') alertColor = 'purple';
            if (feature.properties.severity === 'Minor') alertColor = 'yellow';
            return { color: alertColor };
          },
            onEachFeature: function(feature, layer) {
               layer.bindPopup("<b>" + feature.properties.event + "</b><br>" +
                            feature.properties.headline);
                
            }
          
      }).addTo(map);
      
});

