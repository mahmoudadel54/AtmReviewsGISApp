import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import L from "leaflet";
import axiosInstance from "../../utils/axiosInstance";
import atmIconImg from "../../assets/icons/atm2.png";
import 'leaflet.fullscreen/Control.FullScreen';
import { OpenStreetMapProvider,GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-feature-legend/src/feature-legend';
import 'leaflet-geosearch/dist/geosearch.css'
import 'leaflet-feature-legend/src/feature-legend.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import "leaflet/dist/leaflet.css";
let atmIcon = new L.Icon({
  iconUrl: atmIconImg,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0],
});
function MapComponent(props) {
  const [atmData, setAtmData] = useState(null);
  const fetchAtmData = async () => {
    try {
      let res = await axiosInstance.get("/atm", {
        headers: {
          authorization: props.token,
        },
      });
      return res.data;
    } catch (error) {
      console.log({ error });
      return false;
    }
  };
  //fetch atms data
  useEffect(() => {
    fetchAtmData().then((res) => {
      if (res) {
        setAtmData(res);
      } else {
        console.log("No atm data");
        setAtmData([]);
      }
    });
    return () => {};
  }, []);
  //create map
  useEffect(() => {
    const { setMapInstance } = props;
    let osmTileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    let map = new L.map("mapID", {
      center: [25, 30],
      zoom: 5,
      layers: [osmTileLayer],
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topleft'
      }
    });
    const provider = new OpenStreetMapProvider();

const searchControl = new GeoSearchControl({
  provider: provider,// required
  // style: 'bar',
  autoComplete: true, // optional: true|false  - default true
  autoCompleteDelay: 250,// optional: number      - default 250
  showMarker: false,
  autoClose: true,
});
map.addControl(searchControl);
const legend = L.control.featureLegend({
  position: "bottomright",
  title: "Legend",
  items: {
      "ATM Machine": { icon: atmIcon, width: 30 },
     
  }
});
legend.addTo(map);
L.control.scale().addTo(map);

    map.on('click',()=>{
            props.setShowReviewList({ bool: false, atmId: "",latlng:"" });
            props.setReviewData([]);
          
          })
    setMapInstance(map);
    return () => {
      setMapInstance(null);
    };
  }, []);
  //add data to map
  useEffect(() => {
    let { mapInstance, setMapInstance } = props;
    if (mapInstance) addLayerToMap(atmData, mapInstance);
    return () => {
    };
  }, [atmData]);
  const addLayerToMap = (data, map) => {
    let atmLayer = L.geoJSON(
      {
        type: "FeatureCollection",
        features: data,
      },
      {
        pointToLayer: function (geoJsonPoint, latlng) {
          
          let marker = new L.marker(latlng, {
            icon: atmIcon,
          });
          
          marker.on("click", async (e) => {
            if (e.target.feature) {
              // let ownerId = props.user._id ? props.user._id : props.user.id;
              let atmId = e.target.feature._id;
              let latlngAtm = e.latlng;
              try {
                let res = await axiosInstance.get(
                  `/review/atmid/${atmId}`,
                  {
                    headers: {
                      authorization: props.token,
                    },
                  }
                );
                props.setShowReviewList({ bool: true, atmId, latlng:latlngAtm });
                props.setReviewData(res.data);
              } catch (error) {
                console.log(error);
              }
            } else {
              props.setShowReviewList({ bool: false, atmId: "",latlng:"" });
              props.setReviewData([]);
            }
          });
          return marker;
        },
      }
    );
    atmLayer.on("add", (e) => {
      //zoom to layer
      map.fitBounds(atmLayer.getBounds());
    });
    map.addLayer(atmLayer);
    console.log({map});
  };
  return <div id="mapID"></div>;
}
const mapStateToProps = ({ user }) => {
  return {
    isAuth: user.auth.isAuth,
    token: user.auth.user.token,
    user: user.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    openLoaderForLoginRequest: () => dispatch({ type: "LOGIN_REQUEST" }),
    getLoginData: (payload) => dispatch({ type: "LOGIN_SUCCESS", payload }),
    failToLogin: (payload) => dispatch({ type: "LOGIN_FAILURE", payload }),
    setReviewData: (payload) => dispatch({ type: "SET_REVIEWS", payload }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
