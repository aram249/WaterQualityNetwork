import React, { Component } from 'react';
import { Icon } from "leaflet";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import Freedraw, { CREATE, EDIT, DELETE, ALL } from '../Freedraw';
import CheckboxContainer from './Checkboxes';
import "leaflet/dist/leaflet.css";
import '../styles/map.css';


const myIcon = new Icon ({
  iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

class map extends Component {
  state = {
    controls: [
      {
        id: 'create',
        label: 'Create',
        mode: CREATE,
        isChecked: false
      },
      {
        id: 'edit',
        label: 'Edit Polygons',
        mode: EDIT,
        isChecked: false
      },
      {
        id: 'delete',
        label: 'Delete',
        mode: DELETE,
        isChecked: false
      }
    ]
  };

  componentDidMount() {
    document.addEventListener('keydown', event => {
      // Cancel the current FreeDraw action when the escape key is pressed.
      if (event.key === 'Escape') {
        this.freedrawRef.current.leafletElement.cancel();
      }
    });
  }

  // Set the state according to the selections of the checkboxes
  handleOptionsChange = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => {
      const copyControls = prevState.controls.slice();
      const control = copyControls.find(each => each.id === item);
      control.isChecked = isChecked;

      return {
        controls: copyControls
      };
    });
  };

  // Listen for any markers added, removed or edited, and then output the lat lng boundaries.
  handleOnMarkers = event => {
    console.log(
      'LatLngs:',
      event.latLngs,
      'Polygons:',
      this.freedrawRef.current.leafletElement.size()
    );
  };

  // Listen for when the mode changes
  handleModeChange = event => {
    console.log('mode changed', event);
  };

  freedrawRef = React.createRef();

  render() {
    let mode = ALL;

    this.state.controls.forEach(control => {
      if (control.isChecked) {
        mode = mode | control.mode;
      } else {
        mode = mode ^ control.mode;
      }
    });

    return (
      this.props.collision ?
      <div>
        <Map
          className="map"
          center={[33.7830, -118.1129]}
          zoom={12}
          doubleClickZoom={false}
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Freedraw
          mode={mode}
          onMarkers={this.handleOnMarkers}
          onModeChange={this.handleModeChange}
          ref={this.freedrawRef}
        />
        {this.props.collision.map(collision => {
          return (
            <Marker key={collision.dr_no} position={[collision.location_1.latitude, collision.location_1.longitude]} icon={myIcon}>
              <Popup>
              <table>
                    <tr>
                      <td>Date Occurred<br/>Time Occurred<br/>Crime Description<br/>Victim Age<br/>Victim Sex<br/>Victime Descent<br/>Premise Description<br/>Cross Street<br/>Location</td>
                      <td>{collision.date_occ}<br/>{collision.time_occ}<br/>{collision.crm_cd_desc}<br/>{collision.vict_age}<br/>{collision.vict_sex}<br/>{collision.vict_descent}<br/>{collision.premis_desc}<br/>{collision.cross_street}<br/>{collision.location}</td>
                    </tr>
                </table>
              </Popup>
            </Marker>
          )
          })
        }
        </Map>
        <div className="checkboxContainer">
          <CheckboxContainer
            checkboxes={this.state.controls}
            onChange={this.handleOptionsChange}
          />
        </div>
      </div>
    : [] );
  }
}

export default map;