import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import UseSwr from 'swr';
import "leaflet/dist/leaflet.css";
import '../styles/map.css';

const myIcon = new Icon ({
    iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
});

const crimeIcon = new Icon ({
    iconUrl: 'leaf-green.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
})

const fetcher = (...args) => fetch(...args).then(Response => Response.json());

export default function map() {
    /**  
     *The following block of code obtains data for collision in Los Angeles
     */
    const url = "https://data.lacity.org/resource/d5tf-ez2w.json";
    const {data,error} = UseSwr(url, {fetcher});
    const collisionData = data && !error ? data.slice(0, 5000) : [];

    /**
     * The following Block of code obtains data for crime in Los Angeles
     */
    const url_crime = "https://data.lacity.org/resource/63jg-8b9z.json";
    const {data_crime,error_crime} = UseSwr(url_crime, {fetcher});
    const crimeData = data_crime && !error_crime ? data_crime.slice(0, 5000) : []; 

    return (
      <MapContainer center={[33.7830, -118.1129]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {collisionData.map(collision => 
        <Marker key={collision.dr_no} position={[collision.location_1.latitude, collision.location_1.longitude]} icon={myIcon}>
            <Popup>
                <table>
                    <tr>
                        <td>DR Number<br/>Date Reported<br/>Date Occurred<br/>Time Occurred<br/>Area ID<br/>Area Name<br/>Reporting District<br/>Crime Code<br/>Crime Description<br/>MO Codes<br/>Victim Age<br/>Victim Sex<br/>Victime Descent<br/>Premise Description<br/>Address<br/>Cross Street<br/>Location</td>
                        <td>{collision.dr_no}<br/>{collision.date_rptd}<br/>{collision.date_occ}<br/>{collision.time_occ}<br/>{collision.area}<br/>{collision.rpt_dist_no}<br/>{collision.crm_cd}<br/>{collision.crm_cd_desc}<br/>{collision.mocodes}<br/>{collision.vict_age}<br/>{collision.vict_sex}<br/>{collision.vict_descent}<br/>{collision.premis_cd}<br/>{collision.premis_desc}<br/>{collision.location}<br/>{collision.cross_street}<br/>{collision.location}</td>
                    </tr>
                </table>
            </Popup>
        </Marker>
        )}
        {crimeData.map(crime => 
        <Marker key={crime.dr_no} position={[crime.lat, crime.lon]} icon={myIcon}>
        </Marker>
        )}
      </MapContainer>
    );
  }