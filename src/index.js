//const mapStyles = import('./mapbox-styling.js');
import * as mapStyles from './mapbox-styling.js';

mapboxgl.accessToken = 'pk.eyJ1IjoicGV0ZXJib3llciIsImEiOiJjanF5aHpuYXAwMGhvNDl0MmRkN3F2cHpxIn0.cdJjFtN1PHLcMZTlGC1WNg';

const colors = {
    CITRIX: '#f9423a',
    PROGRAMMED: '#3498DB',
    GREENWAY: '#28B463',
    EXISTING: '#EEE',
}

const layers = {
    EXISTING: "existing-bike-facilities-layer",
    EXISTING_DASHED: "existing-bike-facilities-dashed-layer",
    PROGRAMMED: "programmed-bike-facilities-layer",
    PROGRAMMED_DASHED: "programmed-bike-facilities-dashed-layer",
    RALEIGH_GREENWAY: "existing-raleigh-greenways-layer",
    RALEIGH_GREENWAY_DASHED: "existing-raleigh-greenways-dashed-layer",
    RALEIGH_GREENWAY_SYMBOL: "raleigh-greenway-symbol-layer",
    CARY_GREENWAY: "cary-greenways-layer",
    CARY_GREENWAY_DASHED: "cary-greenways-dashed-layer",
    GREENWAY_DETOUR: "greenway-detour-layer",
    CARY_BIKES: "cary-bikes-layer",
    CARY_BIKES_DASHED: "cary-bikes-dashed-layer",
    CITRIX: 'citrix-cycle-stations-layer',
}

const sources = {
    RALEIGH_GREENWAY: "existing-greenways-raleigh",
    CARY_GREENWAY: "cary-greenways",
    GREENWAY_DETOUR: 'greenway-detour',
    CARY_BIKES: "cary-bikes",
    EXISTING_FACILITIES: "existing-bike-facilities",
    PROGRAMMED_FACILITIES: "programmed-bike-facilities",
    CITRIX: "citrix-cycle-stations",
}

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/peterboyer/cjr49i1ql0mza2srxxtgqlpqw',
    center: [-78.638176, 35.779591],
    zoom: 12,
});

const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
})

let lastFoundPosition;

geolocateControl.on('geolocate', (geoPos) => {
    lastFoundPosition = [geoPos.coords.longitude, geoPos.coords.latitude]
})

map.addControl(geolocateControl, 'bottom-right');

map.addControl(new mapboxgl.NavigationControl());

let showingDirections = false;
let showingDirectionsSection = false;

const directionContol = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    profile: "mapbox/cycling",
    styles: mapStyles.directionStyle,
    interactive: false,
    controls: {
        profileSwitcher: false,

    },
})

map.addControl(directionContol, 'top-left');

// Function to help build a query string for querying the ArcGIS REST service
function queryString(queryProperties) {
    let queryString = '';
    for (let property in queryProperties) {
        queryString += `${property}=${queryProperties[property].toString()}&`
    }
    return queryString.slice(0, -1)
}

// REST endpoint for a dataset published to an ArcGIS Server. In this case, it was published to an ArcGIS Online ArcGIS Server 
let existingRaleighGreenwaysURL = 'https://services.arcgis.com/v400IkDOw1ad7Yad/ArcGIS/rest/services/Greenway_Trails_All/FeatureServer/0';
let caryGreenwaysURL = 'https://maps.townofcary.org/arcgis1/rest/services/OpenData/MapServer/17';
let caryBikeURL = 'https://maps.townofcary.org/arcgis1/rest/services/OpenData/MapServer/16';
let existingBikeFacilities = 'https://services.arcgis.com/v400IkDOw1ad7Yad/ArcGIS/rest/services/Existing_Bike_Facilities/FeatureServer/6';
let programmedBikeFacilities = 'https://services.arcgis.com/v400IkDOw1ad7Yad/ArcGIS/rest/services/Programmed_Bike_Facilities/FeatureServer/6';
let citrixCycleStations = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Citrix_Cycle_Stations/FeatureServer/0';

// Create the query string. These are the minimum parameters needed to return valid GeoJSON of a dataset, but addtional parameters could be added to refine the query
let queryParams = queryString({
    where: "1=1",
    outSR: 4326,
    outFields: "*",
    f: "geojson"
});

let caryGreenwayQueryParams = queryString({
    where: "STATUS LIKE 'EXISTING'",
    outSR: 4326,
    outFields: "*",
    f: "geojson"
});

let caryBikeQueryParams = queryString({
    // ObjectID 645 is a bad apple that causes the GeoJSON call to return a 400
    where: "STATUS LIKE 'EXISTING' AND OBJECTID <> 645",
    outSR: 4326,
    outFields: "*",
    f: "geojson"
});

let citrixQuery = queryString({
    where: "status LIKE 'open'",
    outSR: 4326,
    outFields: "*",
    f: "geojson"
});

// Generate the full query URL
let existingRaleighGreenwaysQuery = `${existingRaleighGreenwaysURL}/query?${queryParams}`;
let caryGreenwaysQuery = `${caryGreenwaysURL}/query?${caryGreenwayQueryParams}`;
let caryBikeQuery = `${caryBikeURL}/query?${caryBikeQueryParams}`;
let existingBikeFacilitiesQuery = `${existingBikeFacilities}/query?${queryParams}`;
let programmedBikeFacilitiesQuery = `${programmedBikeFacilities}/query?${queryParams}`;
let citrixCycleStationsQuery = `${citrixCycleStations}/query?${citrixQuery}`;
let greenwayDetourQuery = 'https://gist.githubusercontent.com/jonathonwpowell/51172dccc17cf8a832ff6566e700c2d8/raw/map.geojson';

map.on('load', () => {

    map.addSource(sources.EXISTING_FACILITIES, {
        'type': 'geojson',
        'data': existingBikeFacilitiesQuery
    });

    map.addLayer({
        'id': layers.EXISTING,
        'type': 'line',
        'source': sources.EXISTING_FACILITIES,
        'layout': {},
        'paint': mapStyles.layerStyles.RALEIGH_ROAD_EXISTING,
    });

    map.addLayer({
        'id': layers.EXISTING_DASHED,
        'type': 'line',
        'source': sources.EXISTING_FACILITIES,
        'layout': {},
        'paint': mapStyles.layerStyles.RALEIGH_ROAD_EXISTING_DASHED,
    });

    map.addSource(sources.CARY_BIKES, {
        'type': 'geojson',
        'data': caryBikeQuery,
    });

    map.addLayer({
        'id': layers.CARY_BIKES,
        'type': 'line',
        'source': sources.CARY_BIKES,
        'layout': {},
        'paint': mapStyles.layerStyles.CARY_ROAD_EXISTING,
    });

    map.addLayer({
        'id': layers.CARY_BIKES_DASHED,
        'type': 'line',
        'source': sources.CARY_BIKES,
        'layout': {},
        'paint': mapStyles.layerStyles.CARY_ROAD_EXISTING_DASHED,
    });

    map.addSource(sources.PROGRAMMED_FACILITIES, {
        'type': 'geojson',
        'data': programmedBikeFacilitiesQuery
    });

    map.addLayer({
        'id': layers.PROGRAMMED,
        'type': 'line',
        'source': sources.PROGRAMMED_FACILITIES,
        'layout': {},
        'paint': mapStyles.layerStyles.RALEIGH_ROAD_PROGRAMMED,
    });

    map.addLayer({
        'id': layers.PROGRAMMED_DASHED,
        'type': 'line',
        'source': sources.PROGRAMMED_FACILITIES,
        'layout': {},
        'paint': mapStyles.layerStyles.RALEIGH_ROAD_PROGRAMMED_DASHED,
    });

    map.addSource(sources.RALEIGH_GREENWAY, {
        'type': 'geojson',
        'data': existingRaleighGreenwaysQuery
    });

    map.addLayer({
        'id': layers.RALEIGH_GREENWAY,
        'type': 'line',
        'source': sources.RALEIGH_GREENWAY,
        'layout': {},
        'paint': mapStyles.layerStyles.RALEIGH_GREENWAYS,
    });

    map.addLayer({
        'id': layers.RALEIGH_GREENWAY_SYMBOL,
        'type': 'symbol',
        'source': sources.RALEIGH_GREENWAY,
        'layout': {
            'text-field': [                       
                'match',
                ['get', 'GWSTATUS'],
                "CLOSED_TEMP", "X",
                ""
            ],
            'symbol-placement': 'line-center',
        },
        'paint': mapStyles.layerStyles.GREENWAY_CLOSED_SYMBOL,
    });

    map.addSource(sources.GREENWAY_DETOUR, {
        'type': 'geojson',
        'data': greenwayDetourQuery,
    });

    map.addLayer({
        'id': layers.GREENWAY_DETOUR,
        'type': 'line',
        'source': sources.GREENWAY_DETOUR,
        'layout': {},
        'paint': mapStyles.layerStyles.GREENWAYS_DETOURS,
    })

    // We are using greenway width as a guess as to how bikable a section
    // of greenway is.  If it is less than 7 ft wide we assume it is not easily bikeable
    // and make it dashed
    map.addLayer({
        'id': layers.RALEIGH_GREENWAY_DASHED,
        'type': 'line',
        'source': sources.RALEIGH_GREENWAY,
        'layout': {},
        'paint': mapStyles.layerStyles.RALEIGH_GREENWAYS_DASHED
    });

    map.addSource(sources.CARY_GREENWAY, {
        'type': 'geojson',
        'data': caryGreenwaysQuery
    });

    map.addLayer({
        'id': layers.CARY_GREENWAY,
        'type': 'line',
        'source': sources.CARY_GREENWAY,
        'layout': {},
        'paint': mapStyles.layerStyles.CARY_GREENWAYS_EXISTING
    });

    map.addLayer({
        'id': layers.CARY_GREENWAY_DASHED,
        'type': 'line',
        'source': sources.CARY_GREENWAY,
        'layout': {},
        'paint': mapStyles.layerStyles.CARY_GREENWAYS_EXISTING_DASHED
    });


    map.addSource(sources.CITRIX, {
        'type': 'geojson',
        'data': citrixCycleStationsQuery
    });

    map.addLayer({
        'id': layers.CITRIX,
        'type': 'circle',
        'source': sources.CITRIX,
        'layout': {},
        'paint': mapStyles.layerStyles.CITRIX_CYCLE,
    });

    map.resize();
});

function legendToggleLayer(ele,layerName) {
    var layerName = layerName || ele.name;
    var visibilityState = ele.checked ? 'visible' : 'none';

    map.setLayoutProperty(layerName, 'visibility', visibilityState);
}

function toggleDirectionSection() {
    if (showingDirectionsSection) {
        document.getElementsByClassName('mapboxgl-ctrl-directions')[0].style.display = 'none';
        document.getElementById('show-directions-container').style.display = 'block';
        document.getElementById('direction-buttons').style.display = 'none';
        directionContol.interactive(false);
        showingDirectionsSection = false;
    } else {
        document.getElementsByClassName('mapboxgl-ctrl-directions')[0].style.display = 'block';
        document.getElementById('show-directions-container').style.display = 'none';
        document.getElementById('direction-buttons').style.display = 'block';
        directionContol.interactive(true);
        showingDirectionsSection = true;
    }
}

const showDirectionsContainer = document.getElementById('show-directions-container');
showDirectionsContainer.addEventListener('click', toggleDirectionSection);