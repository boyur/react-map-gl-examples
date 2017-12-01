import React, { Component } from 'react';
import fetch from 'node-fetch-polyfill';
import MapPik from '@pik/map';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@pik/map/src/components/MapPik/style.css'

const server = 'https://pik-admin.urbica.co';
const token = 'pk.eyJhbGciOiJIUzI1NiJ9.cHVibGlj.KFtMch9eeBMfLUVHAvDFlyPwfSI4V8EYu5yW5qIa9Sg';
const options = { method: 'GET' };

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      load: false,
      markers: null,
      activeId: 0,
      focusId: 0
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  componentWillMount() {
    if (!this.state.layers) {
      Promise.all([
        fetch(`${server}/api/public/buildings.geojson?token=${token}`, options).then(r => r.json()),
        fetch(`${server}/api/public/roads.geojson?token=${token}`, options).then(r => r.json()),
        fetch(`${server}/api/public/paths.geojson?token=${token}`, options).then(r => r.json()),
        fetch(`${server}/api/public/poi.geojson?token=${token}`, options).then(r => r.json()),
        fetch(`${server}/api/public/greenarea.geojson?token=${token}`, options).then(r => r.json()),
        fetch(`${server}/api/public/complex.geojson?token=${token}`, options).then(r => r.json()),
      ]).then(([buildings, roads, paths, poi, greenarea, complex]) => {
        this.setState({
          layers: {
            buildings,
            complex,
            greenarea,
            poi,
            roads,
            paths
          }
        });
      }).catch(error => console.log(error));
    }

    if (!this.state.markers) {
      fetch('https://api.pik.ru/v1/block?types=1,2&metadata=1&statistics=1&images=1')
        .then(response => response.json())
        .then((resp) => {
          this.setState({
            markers: resp
          });
        })
        .catch('error');
    }
  }

  onMarkerClick(id) {
    this.setState({ activeId: id });
  }

  render() {
    return (
        <MapPik
          style={{ width: '100%', height: '400px' }}
          accessToken={process.env.MAPBOX_ACCESS_TOKEN}
          mapStyle='mapbox://styles/pikmap/cj0l1j8nm00462snnkvqtc6zd'
          onMarkerClick={this.onMarkerClick}
          markers={this.state.markers}
          layers={this.state.layers}
          activeId={this.state.activeId}
          focusId={this.state.focusId}
          latitude={55.789}
          longitude={37.604}
          zoom={9}
        />
    );
  }
}
