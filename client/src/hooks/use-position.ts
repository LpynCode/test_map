import { useEffect, useState } from "react"
import { ICoordinates } from "../types/coordinates.interface"


export const usePosition = () => {
    const [position, setPosition] = useState<ICoordinates>([0, 0]);

    const onChange = ({coords: {latitude, longitude}}: GeolocationPosition) => {
        setPosition([latitude, longitude]);
    };


    useEffect(() => {
        const geo = navigator.geolocation;
        geo.getCurrentPosition(onChange);
    }, []);

    return position;
}