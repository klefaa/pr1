import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { MapMarker, MarkerImage } from '@/types';

type MarkersContextType = {
  markers: MapMarker[];

  addMarker: (
    latitude: number,
    longitude: number
  ) => void;

  removeMarker: (id: string) => void;

  getMarkerById: (
    id: string
  ) => MapMarker | undefined;

  addImageToMarker: (
    markerId: string,
    uri: string
  ) => void;

  removeImageFromMarker: (
    markerId: string,
    imageId: string
  ) => void;
};

const MarkersContext =
  createContext<MarkersContextType | undefined>(
    undefined
  );

export function MarkersProvider({
  children,
}: PropsWithChildren) {
  const [markers, setMarkers] =
    useState<MapMarker[]>([]);

  const addMarker = (
    latitude: number,
    longitude: number
  ) => {
    const newMarker: MapMarker = {
      id: Date.now().toString(),
      latitude,
      longitude,
      images: [],
    };

    setMarkers(currentMarkers => [
      ...currentMarkers,
      newMarker,
    ]);
  };

  const removeMarker = (id: string) => {
    setMarkers(currentMarkers =>
      currentMarkers.filter(
        marker => marker.id !== id
      )
    );
  };

  const getMarkerById = (id: string) => {
    return markers.find(
      marker => marker.id === id
    );
  };

  const addImageToMarker = (
    markerId: string,
    uri: string
  ) => {
    const newImage: MarkerImage = {
      id: Date.now().toString(),
      uri,
    };

    setMarkers(currentMarkers =>
      currentMarkers.map(marker => {
        if (marker.id !== markerId) {
          return marker;
        }

        return {
          ...marker,
          images: [
            ...marker.images,
            newImage,
          ],
        };
      })
    );
  };

  const removeImageFromMarker = (
    markerId: string,
    imageId: string
  ) => {
    setMarkers(currentMarkers =>
      currentMarkers.map(marker => {
        if (marker.id !== markerId) {
          return marker;
        }

        return {
          ...marker,
          images: marker.images.filter(
            image => image.id !== imageId
          ),
        };
      })
    );
  };

  return (
    <MarkersContext.Provider
      value={{
        markers,
        addMarker,
        removeMarker,
        getMarkerById,
        addImageToMarker,
        removeImageFromMarker,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
}

export function useMarkers() {
  const context = useContext(
    MarkersContext
  );

  if (!context) {
    throw new Error(
      'useMarkers must be used inside MarkersProvider'
    );
  }

  return context;
}