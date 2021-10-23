import './App.css';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import arrow from "./images/icon-arrow.svg";

function App() {
  const [coords, setCoords] = useState([37.2757113,-104.6553407])
  return (
    <div class="main">
      <section className="main__header"></section>
      <section className="main__map">
        <MapContainer id="mapid" center={coords} zoom={2} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={[37.664697,-122.417095]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
        </MapContainer>
      </section>
      <section className="main__search-results container">
        <h2>IP Address Tracker</h2>
        <div className="main__search-result-input">
          <form>
            <input type="text" />
            <div className="btn"></div>
          </form>
        </div>
        <div className="main__search-results-output">
          <div className="ip">
            <h3 className="output-header">ip address</h3>
            <p className="output-text">192.168.174.101</p>
          </div>
          <div className="location">
            <h3 className="output-header">location</h3>
            <p className="output-text">Brookly, NY 10001</p>
          </div>
          <div className="timezone">
            <h3 className="output-header">timezone</h3>
            <p className="output-text">UTC -05:00</p>
          </div>
          <div className="isp">
            <h3 className="output-header">isp</h3>
            <p className="output-text">SpaceX Starlink</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
