import React, { useState } from "react";
import MapComponent from "../components/MainPage/mapComponent";
import ReviewsList from "../components/MainPage/reviewsList";

function Home(props) {
  const [mapInstance, setMapInstance] = useState(null);
  const [showReviewList, setShowReviewList] = useState({bool:false,atmId:"", latlng:""});

  return (
    <React.Fragment>
      <div className="main-page">
        <MapComponent
          mapInstance={mapInstance}
          setMapInstance={setMapInstance}
          setShowReviewList={setShowReviewList}
        />
        {showReviewList.bool && (
          <ReviewsList
            setMapInstance={setMapInstance}
            mapInstance={mapInstance}
            setShowReviewList={setShowReviewList}
            showReviewList={showReviewList}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default Home;
