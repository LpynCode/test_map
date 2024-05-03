import axios from "axios";

export const $mapApi = axios.create({
    baseURL: "https://nominatim.openstreetmap.org/",
    headers: {
        "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
      }
})