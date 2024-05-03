import { ICoordinates } from "../../types/coordinates.interface";
import { MapContainerProps } from "react-leaflet";


export interface MapProps extends MapContainerProps {
    coordinates: ICoordinates;
}