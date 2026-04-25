import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const FlyToDistrict = ({ position }) => {
  const map = useMap();

  if (position) {
    map.flyTo(position, 14);
  }

  return null;
};

const CovarageArea = () => {
  const position = [23.8103, 90.4125];
  const data = useLoaderData();
  
    const mapRef = useRef(null);

  return (
    <div className="text-center m-3">
      <h3 className="text-3xl mb-3 font-bold">
        Covarage Area Where We Provide Services
      </h3>

      <div className="border w-full h-[700px]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[700px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          

          {data?.map((mapdata, index) => (
            <Marker
              key={index}
              position={[mapdata.latitude, mapdata.longitude]}
            >
              <Popup>
                <strong>{mapdata.district}</strong> <br />
                Services Area: {mapdata.covered_area}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CovarageArea;