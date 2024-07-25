import { useRef, useState, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import useQueryBaseMap from '../../hooks/useQueryBaseMap';

const Map = () => {
  const { baseMap } = useQueryBaseMap();
  const mapContainer = useRef(null);
  const [viewState] = useState({
    longitude: 107.767692513626,
    latitude: -6.93146291519225,
    zoom: 17,
    pitch: 60, // Add pitch for 3D view
    bearing: 25 // Optional: Add bearing for a better 3D view
  });

  useEffect(() => {
    if (!mapContainer.current) return;

    const { longitude, latitude, zoom, pitch, bearing } = viewState;
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: baseMap,
      center: [longitude, latitude],
      zoom: zoom,
      pitch: pitch,
      bearing: bearing
    });

    map.on('load', () => {
      // Add the GeoJSON source
      map.addSource('itb_jatinangor', {
        type: 'geojson',
        data: 'http://103.6.53.254:20281/itb_jatinangor.geojson'
      });

      // Add a fill-extrusion layer to use the GeoJSON source
      map.addLayer({
        id: 'itb_jatinangor-layer',
        type: 'fill-extrusion',
        source: 'itb_jatinangor',
        paint: {
          'fill-extrusion-color': 'red',
          'fill-extrusion-height': ['get', 'z'],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 1
        }
      });
    });

    return () => map.remove();
  }, [viewState, baseMap]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
