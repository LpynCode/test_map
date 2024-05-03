import { HTMLAttributes } from "react"
import { IMarker } from "../../types/marker.interface";


export interface UpdateMarkerFormProps extends HTMLAttributes<HTMLFormElement>{
    marker: IMarker;
    closeEditMode: () => void;
}