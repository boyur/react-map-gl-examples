import React from 'react';
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default () => (
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle="mapbox://styles/mapbox/light-v9"
    accessToken={process.env.MAPBOX_ACCESS_TOKEN}
    latitude={37.78}
    longitude={-122.41}
    zoom={11}
  />
);
