import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { TILE_LAYER_URL } from "../../constants/tile-layer-url";
import { MapProps } from "./Map.props";
import styles from './Map.module.css';
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { DragEndEvent } from "leaflet";
import { MapView } from "../MapView/MapView";
import { WebsocketContext } from "../../context/websocket.context";
import { useMarkersStore } from "../../store/markers.store";
import { IUpdateMarkerRequest } from "../../types/websocket/markers.interfaces";
import { ICoordinates } from "../../types/coordinates.interface";
import { IMarker } from "../../types/marker.interface";

export const Map = ({ coordinates, ...props }: MapProps) => {
    const { markers, setPopupInfoData } = useMarkersStore();

    const { sendMessage } = useContext(WebsocketContext);

    const onDragEnd = (event: DragEndEvent, marker: IMarker) => {
        const newPos: ICoordinates = event.target.getLatLng();
        sendMessage<IUpdateMarkerRequest>({ type: "markers.update", data: { ...marker, coordinates: newPos } })
    }

    const onClick = (marker: IMarker) => {
        setPopupInfoData(marker);
    }
    /*     const addNewMarker = (marker: IMarker) => {
            sendMessage({ type: "markers.create", data: marker })
            addMarker(marker);
        } */
    return (
        <MapContainer className={styles.map} center={coordinates} zoom={13} scrollWheelZoom={true} {...props}>
            <TileLayer url={TILE_LAYER_URL} />
            {markers.map((marker, index) => (
                <Marker
                    draggable
                    eventHandlers={{
                        dragend: (event) => onDragEnd(event, marker),
                        click: () => onClick(marker)
                    }}
                    key={index}
                    position={marker.coordinates}
                >
                </Marker>
            ))}

            <MapView coordinates={coordinates} />
        </MapContainer>

    )
};