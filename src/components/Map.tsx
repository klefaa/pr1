import { useRef } from 'react';
import type { ElementRef } from 'react';

import { Alert, StyleSheet } from 'react-native';

import MapView, {
  LongPressEvent,
  Marker,
} from 'react-native-maps';

import { MapMarker } from '@/types';

type Props = {
  markers: MapMarker[];
  onAddMarker: (
    latitude: number,
    longitude: number
  ) => void;
  onMarkerPress: (id: string) => void;
};

export default function Map({
  markers,
  onAddMarker,
  onMarkerPress,
}: Props) {
  const markerRefs =
    useRef<Record<string, ElementRef<typeof Marker> | null>>({});

  const handleLongPress = (
    event: LongPressEvent
  ) => {
    try {
      const { latitude, longitude } =
        event.nativeEvent.coordinate;

      onAddMarker(latitude, longitude);
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Error',
        'Could not create marker.'
      );
    }
  };

  const handleMarkerPress = (id: string) => {
    markerRefs.current[id]?.hideCallout();

    setTimeout(() => {
      onMarkerPress(id);
    }, 50);
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 55.752,
        longitude: 37.617,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      onLongPress={handleLongPress}
      onPress={() => {
        Object.values(
          markerRefs.current
        ).forEach(markerRef => {
          markerRef?.hideCallout();
        });
      }}
    >
      {markers.map(marker => (
        <Marker
          ref={ref => {
            markerRefs.current[marker.id] = ref;
          }}
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          onPress={() =>
            handleMarkerPress(marker.id)
          }
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});