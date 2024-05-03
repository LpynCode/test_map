import { ICoordinates } from "./coordinates.interface";


export interface IMarker {
    id: number;
    name: string;
    description: string;
    coordinates: ICoordinates;
    user: {
        id: number;
        name: string;
    };
}