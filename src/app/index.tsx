import { Alert, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import Map from '@/components/Map';
import { useMarkers } from '@/context/MarkersContext';

export default function HomeScreen() {
  const { markers, addMarker } = useMarkers();

  const openMarker = (id: string) => {
    try {
      router.push({ pathname: '/marker/[id]', params: { id } });
    } catch (error) {
      console.error(error);

      Alert.alert('Navigation error', 'Could not open marker.');
    }
  };

  return (
    <View style={styles.container}>
      <Map markers={markers} onAddMarker={addMarker} onMarkerPress={openMarker} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});