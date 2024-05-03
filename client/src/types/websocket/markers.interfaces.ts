import { ICoordinates } from "../coordinates.interface";


export interface ICreateMarkerRequest {
    name: string;
    description: string;
    coordinates: ICoordinates;
}

export interface IUpdateMarkerRequest {
    id: number;
    name: string;
    description: string;
    coordinates: ICoordinates;
}

export interface IRemoveMarkerRequest {
    id: number;
}

export interface IRemoveMarkerResponse {
    id: number;
}