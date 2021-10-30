import './App.css';
import { useState, Fragment} from 'react';
import { MapContainer, TileLayer, Marker, MapConsumer } from 'react-leaflet';
import L from 'leaflet';
import axios from "axios";
import iconMarker from "./images/icon-location.svg"

function App() {
  const [fetched, setFetched] = useState(false);
  const [responseData, setResponseData] = useState({isp: '--', ip: '--', location: {city:'-', region:'-', timezone:'--', lat:37.2757113, lng:-104.6553407 }});
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_pUD0JiNuwNPviw2lVFtviznLhfFHc&";
  let searchText = "";
  let numberRegEx = new RegExp(/\d+/);

  const myMarker = new L.Icon({
    iconUrl: iconMarker,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(35, 40),
  });


  const onChange = (e) => {
    searchText = e.currentTarget.value;
  }

  const getData = async (e) => {
    const ip = searchText.match(numberRegEx);

    setFetched(false);
    setIsSearching(true);
    setError(false);
    
    // Check if text field has an IP or domain to perform correct search
    if(!ip) {
      try {
        const response = await axios.get(`${url}domain=${searchText}`);
        const {ip, location, isp} = response.data;
        setResponseData({...responseData, ip, location, isp})
      } catch (error) {
        setIsSearching(false);
        setError(true);
        setResponseData({isp: '', ip: '', location: {city:'', region:'', timezone:'', lat:37.2757113, lng:-104.6553407 }});
      }
    }else {
      try {
        const response = await axios.get(`${url}ipAddress=${searchText}`);
        const {ip, location, isp} = response.data;
        setResponseData({...responseData, ip, location, isp})
      } catch (error) {
        setIsSearching(false);
        setError(true);
        setResponseData({isp: '', ip: '', location: {city:'', region:'', timezone:'', lat:37.2757113, lng:-104.6553407 }});
      }
    }

    setIsSearching(false);
    setFetched(true);
  }

  return (
    <div className="main">
      <section className="main__header"></section>  
      <section className="main__map">
        <MapContainer id="mapid" center={[responseData.location.lat, responseData.location.lng]} zoom={3} scrollWheelZoom={false} zoomControl={false} touchZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {fetched ? <Marker position={[responseData.location.lat, responseData.location.lng]} icon={myMarker} /> : <></>}
          <MapConsumer>{ (map) => { map.setView([responseData.location.lat, responseData.location.lng],  fetched ? 8 : 3 , true); return null}}</MapConsumer>
        </MapContainer>
      </section>
      <section className="main__search-results container">
        <h2 className="main__search-results__header">IP Address Tracker</h2>
        <div className={`main__search-result-input ${error ? "error": "" }`}>
          <form>
            <input type="text" placeholder="Search for any IP address or domain" tabIndex={1} onChange={onChange} />
            <div className="btn" tabIndex={2} onClick={getData}></div>
          </form>
        </div>
        { isSearching ? 
        <div className="search-in-process main__search-results-output">
          <div className="circle first"></div>
          <div className="circle second"></div>
          <div className="circle third"></div> 
        </div> 
        : <div className="main__search-results-output">
          <div className="output-item">
            <h3 className="output-item__header">ip address</h3>
            <p className="output-item__text">{responseData.ip}</p>
          </div>
          <div className="output-item">
            <h3 className="output-item__header">location</h3>
            <p className="output-item__text">{`${responseData.location.city}${fetched ? "," : ""}${responseData.location.region} `}</p>
          </div>
          <div className="output-item">
            <h3 className="output-item__header">timezone</h3>
            <p className="output-item__text">{`${fetched ? "UTC": ""}${responseData.location.timezone}`}</p>
          </div>
          <div className="output-item">
            <h3 className="output-item__header">isp</h3>
            <p className="output-item__text">{responseData.isp}</p>
          </div>
        </div>}
      </section>
    </div>
  );
}

export default App;
