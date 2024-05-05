import { create } from "zustand";
import { IMarker } from "../types/marker.interface";
import { ICoordinates } from "../types/coordinates.interface";


interface ImarkersState {
    markers: IMarker[];
    searchedMarkers: IMarker[];

    createPopupData: ICoordinates | null;
    setCreatePopupData: (data: ICoordinates | null) => void;

    popupInfoData: IMarker | null;
    setPopupInfoData: (data: IMarker | null) => void;

    selectedMarker: IMarker | null;
    selectMarker: (marker: IMarker | null) => void

    setMarkers: (markers: IMarker[]) => void;
    addMarker: (marker: IMarker) => void;
    updateMarker: (marker: IMarker) => void;
    removeMarker: (id: number) => void;

    searchMarkers: (query: string) => void;
}

export const useMarkersStore = create<ImarkersState>((set, get) => ({
    markers: [],
    searchedMarkers: [],
    searchMarkers: (query: string) => {
        
        set((state) => ({
            searchedMarkers: state.markers.filter((marker) => marker.name.toLowerCase().includes(query.toLowerCase()))
        }))
    },
    
    setMarkers: (markers: IMarker[]) => set({ markers, searchedMarkers: markers }),
    addMarker: (marker: IMarker) => {
        set((state) => ({
            markers: [...state.markers, marker],
            searchedMarkers: [...state.markers, marker]
        }))
    },
    updateMarker: ({id, ...data}: IMarker) => {
        if(get().popupInfoData?.id === id) set((state) => ({ popupInfoData: { ...state.popupInfoData , ...data, id } } ))
        set((state) => ({
            markers: state.markers.map((marker) => marker.id === id ? { ...marker, ...data } : marker),
            searchedMarkers: state.markers.map((marker) => marker.id === id ? { ...marker, ...data } : marker)
        }))
    },
    removeMarker: (id: number) => {
        set((state) => ({
            markers: state.markers.filter((marker) => marker.id !== id),
            searchedMarkers: state.markers.filter((marker) => marker.id !== id)
        }))
    },

    selectedMarker: null,
    selectMarker: (marker: IMarker | null) => set({ selectedMarker: marker }),
    
    popupInfoData: null,
    setPopupInfoData: (data: IMarker | null) => set({ popupInfoData: data }),

    createPopupData: null,
    setCreatePopupData: (data: { lat: number, lng: number } | null) => set({ createPopupData: data }),
}))