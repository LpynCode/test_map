import { useEffect } from "react";
import { useMapEvent } from "react-leaflet";
import { LeafletMouseEvent, Map as MapType } from "leaflet";
import { ICoordinates } from "../../types/coordinates.interface";
import { useMarkersStore } from "../../store/markers.store";

interface MapViewProps {
    coordinates: ICoordinates,
}
export const MapView = ({ coordinates }: MapViewProps) => {
    const { setCreatePopupData } = useMarkersStore();

    const onClick = (event: LeafletMouseEvent) => {
        setCreatePopupData({ lat: event.latlng.lat, lng: event.latlng.lng });
    }

    const map: MapType = useMapEvent('click', onClick);

    useEffect(() => {
        map.setView(coordinates, map.getZoom())
    }, [coordinates]);

    return null;
}