# This will be my assignment 4 for WebGIS course.
## Leaflet Web Map
### Author Jaden Brutsman

A map showing real-time weather radar and alerts from the National Weather Service.
<https://jbruts1.github.io/LeafletWebMapDemo/weather>

A map showing earthquake data from USGS.
<https://jbruts1.github.io/LeafletWebMapDemo/earthquake>

## Weather Map
The weather map uses:
- **Basemap**: Carto Light (for better contrast with radar/alerts).
- **Weather Radar**: WMS radar layer from Iowa State University Mesonet.
- **Weather Alerts**: GeoJSON alerts from the NWS.

Alert severity is color coded:
-**Extreme**: Purple
-**Severe**: Red
-**Minor**: Yellow
-**Other/Default**:Orange

Each alert also includes a popup with its event type and headline.


## Earthquake Map
The earthquake map uses:
-**Basemap**: OpenStreetMap tiles.
-**Earthquake**: USGS Earthquake Hazards Program feed (all earthquakes in the past year).

Features include:
-Circle markers at each earthquake location.
-Popup showing magnitude, location, and time.
-Marker size and color with scale magnitude.
-A legend in the bottom-right explains the magnitude scale.

## Notes
-The NWS API does not always have "extreme" or "minor" alerrs active at the time of viewing.
