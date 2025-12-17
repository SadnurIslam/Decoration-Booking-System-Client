import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CoverageMap = () => {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Service Coverage
      </h2>

      <div className="rounded-3xl overflow-hidden shadow-xl">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={7}
          className="h-[420px]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[23.8103, 90.4125]}>
            <Popup>We serve Dhaka & nearby areas</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default CoverageMap;
