import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { MarkersProvider } from '@/context/MarkersContext';

export default function RootLayout() {
  return (
    <MarkersProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Map',}} />
        <Stack.Screen name="marker/[id]" options={{ title: 'Marker details' }} />
      </Stack>
      <StatusBar style="dark" />
    </MarkersProvider>
  );
}