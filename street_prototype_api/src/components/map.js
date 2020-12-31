import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from "leaflet";
import mapData from "./../data/Traffic_Detectors.json";
import "leaflet/dist/leaflet.css";
import "./map.css";

var myIcon = L.icon ({
    iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

class map extends Component {
    state = {
        lat: 33.7830, 
        lng: -118.1129,
        zoom: 13,
    };

    componentDidMount() {
        //console.log(myData);
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return(
            <div>
                <h1 style={{ textAlign: "center" }}>Prototype Map</h1>
                <MapContainer className="map" style={{ height: "80vh" }} center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    /> 
                    <GeoJSON data= {mapData.features}/>
                        <Marker key={'marker-01'} position={position} icon={myIcon}>
                            <Popup>CSULB <br />  Aaron Ramirez</Popup>
                        </Marker>   
                </MapContainer>
            </div>
        )
    }
}

export default map;