import { useNavigate, useSearchParams } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

function Map() {
    // get cities from context
    const { cities } = useCities();

    // get starting position
    const [mapPosition, setMapPosition] = useState([40, 0]);

    // pull geolocation
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();

    // import url data from custom hook
    const [mapLat, mapLng] = useUrlPosition();

    // syncrhonize map position and mapLat, mapLng
    useEffect(
        function () {
            // set new position if values exist
            if (mapLat && mapLng) {
                setMapPosition([mapLat, mapLng]);
            }
        },
        [mapLat, mapLng]
    );

    // place geolocationPosition into mapPosition
    useEffect(
        function () {
            if (geolocationPosition) {
                setMapPosition([
                    geolocationPosition.lat,
                    geolocationPosition.lng,
                ]);
            }
        },
        [geolocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>
            )}

            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />

                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>{" "}
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

// Change Center Component
function ChangeCenter({ position }) {
    // get instance of map
    const map = useMap();
    // set map to new position
    map.setView(position);

    return null;
}

// Detect Click Component
function DetectClick() {
    // useNavigate hook
    const navigate = useNavigate();

    // check for click event
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}

export default Map;
