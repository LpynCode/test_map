import { create } from "zustand";
import { IMarker } from "../types/marker.interface";
import { ICoordinates } from "../types/coordinates.interface";


interface ImarkersState {
    markers: IMarker[];

    createPopupData: ICoordinates | null;
    setCreatePopupData: (data: ICoordinates | null) => void;

    popupInfoData: IMarker | null;
    setPopupInfoData: (data: IMarker | null) => void;

    setMarkers: (markers: IMarker[]) => void;
    addMarker: (marker: IMarker) => void;
    updateMarker: (marker: IMarker) => void;
    removeMarker: (id: number) => void;
}

export const useMarkersStore = create<ImarkersState>((set, get) => ({
    markers: [],
    createPopupData: null,
    addMarker: (marker: IMarker) => {
        set((state) => ({
            markers: [...state.markers, marker]
        }))
    },
    updateMarker: ({id, ...data}: IMarker) => {
        if(get().popupInfoData?.id === id) set((state) => ({ popupInfoData: { ...state.popupInfoData , ...data, id } } ))
        set((state) => ({
            markers: state.markers.map((marker) => marker.id === id ? { ...marker, ...data } : marker)
        }))
    },
    removeMarker: (id: number) => {
        set((state) => ({
            markers: state.markers.filter((marker) => marker.id !== id)
        }))
    },
    
    popupInfoData: null,
    setPopupInfoData: (data: IMarker | null) => set({ popupInfoData: data }),
    setMarkers: (markers: IMarker[]) => set({ markers }),
    setCreatePopupData: (data: { lat: number, lng: number } | null) => set({ createPopupData: data }),

    
}))