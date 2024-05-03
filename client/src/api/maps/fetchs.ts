import { $mapApi } from ".";
import { ICoordinates } from "../../types/coordinates.interface";


export const getCityByCoordinates = async ([latitude, longitude]: ICoordinates) => {
    const res = await $mapApi.get(`reverse?format=json&lat=${latitude}&lon=${longitude}`);
    
    return res.data;
}

export const findByAdress = async (adress: string) => {
    const res = await $mapApi.get(`search?format=json&street=${adress}`);
    
    return res.data;
}