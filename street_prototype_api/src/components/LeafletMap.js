import React, {Component} from 'react';
import L from 'leaflet';
//import HereTileLayers from './hereTileLayers';
import "leaflet/dist/leaflet.css";
import '../styles/map.css';

// defining the container styles the map sits in
const style = {
    width: '100%',
    height: '100vh'
}
    

// using the reduced.day map styles, have a look at the imported hereTileLayers for more
const hereReducedDay = HereTileLayers.here({
    appId: 'your_heremaps_app_id',
    appCode: 'your_heremaps_app_code',
    scheme: 'reduced.day'
    })    

// For this application we create 
const placesLayer = L.featureGroup();
const clusterLayer = L.featureGroup();

// Create the map
const mapParams = {
    center: [33.7830, -118.1129],
    zoomControl: false,
    zoom: 13,
    layers: [placesLayer, clusterLayer, hereReducedDay]
}

class LeafletMap extends Component {
    // Adding everthing to the component after being mounted
    componentDidMount() {
        this.map = L.map('map', mapParams);
        
        // Create a leaflet pan which will hold the cluster polygons with a given opacity
        const clusterPane = this.map.createPane('clusterPane');
        clusterPane.style.opacity = 0.9;

        // our basemap and add it to the map
        const baseMaps = {
        'HERE Maps Tiles: reduced day': hereReducedDay
        }

        // and overlay maps
        const overlayMaps = {
            'Points of interest': placesLayer,
            Clusters: clusterLayer
        }

        // lets add the layers to our layer control
        L.control.layers(baseMaps, overlayMaps).addTo(this.map)
        // we do want a zoom control
        L.control
            .zoom({
                position: 'topright'
            })
            .addTo(this.map)
        }
        
        render() {
            return <div id="map" style={style} />
        }
}

export default LeafletMap