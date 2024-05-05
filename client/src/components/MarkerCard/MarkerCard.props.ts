import { HTMLAttributes } from "react";
import { IMarker } from "../../types/marker.interface";


export interface MarkerCardProps extends HTMLAttributes<HTMLDivElement> {
    marker: IMarker
}