import { useEffect, useState } from "react"
import { ICoordinates } from "../types/coordinates.interface"


export const usePosition = () => {
    const [position, setPosition] = useState<ICoordinates>({lat: 0, lng: 0});

    const onChange = ({coords: {latitude, longitude}}: GeolocationPosition) => {
        setPosition({lat: latitude, lng: longitude});
    };


    useEffect(() => {
        const geo = navigator.geolocation;
        geo.getCurrentPosition(onChange);
    }, []);

    return position;
}