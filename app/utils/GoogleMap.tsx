import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

const GoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
    });

    loader.load().then(() => {
      const google = window.google;
      const zontLocation = { lat: 19.404495, lng: -99.179555 };

      const map = new google.maps.Map(mapRef.current, {
        center: zontLocation,
        zoom: 14,
      });

      new google.maps.Marker({
        position: zontLocation,
        map,
        title: "ZONT Studio",
        animation: google.maps.Animation.DROP,
        label: {
          text: "ZONT Studio",
          color: "black",
          fontSize: "20px",
          fontWeight: "bold",
        }
      });
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        height: "250px",
        width: "100%",
      }}
    />
  );
};

export default GoogleMap;
