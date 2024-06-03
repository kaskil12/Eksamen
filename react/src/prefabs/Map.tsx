import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLayoutEffect, useState } from 'react';

export function Map() {
    const [mapSize, setMapSize] = useState({ width: "full", height: "400px" });

    useLayoutEffect(() => {
        function updateSize() {
            if (window.innerWidth < 640) {
                setMapSize({ width: "full", height: "300px" });
            } else {
                setMapSize({ width: "600px", height: "400px" });
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className="w-full">
            <h1 className='text-gray-300 font-bold text-3xl'>Vår Lokasjon:</h1>
            <div className="rounded-lg overflow-hidden">
                <div style={{ maxWidth: '600px', width: '100%' }}> {/* Adjust the maxWidth here */}
                    <MapContainer
                        center={[60.80758436467838, 11.053091129300938]}
                        zoom={13}
                        style={{ height: mapSize.height, width: mapSize.width }}
                        className="w-full"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[60.80758436467838, 11.053091129300938]}>
                            <Popup>
                                vårt hjemmested <br /> Hamar
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
