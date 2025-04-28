import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { MapPin } from 'lucide-react-native';
import { properties } from '@/utils/mockData';

const INITIAL_REGION = {
  latitude: 40.4168,
  longitude: -3.7038,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleMarkerPress = (id: string) => {
    router.push(`/property/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa de Propiedades</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={INITIAL_REGION}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {properties.map((property) => (
            <Marker
              key={property.id}
              coordinate={{
                latitude: 40.4168 + Math.random() * 0.02 - 0.01, // Simulated coordinates
                longitude: -3.7038 + Math.random() * 0.02 - 0.01,
              }}
              onPress={() => handleMarkerPress(property.id)}
            >
              <View style={styles.markerContainer}>
                <MapPin size={24} color="#0A84FF" />
                <View style={styles.markerDot} />
              </View>
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{property.title}</Text>
                  <Text style={styles.calloutPrice}>{property.price}</Text>
                  <Text style={styles.calloutType}>{property.type}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#333333',
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerDot: {
    width: 8,
    height: 8,
    backgroundColor: '#0A84FF',
    borderRadius: 4,
    position: 'absolute',
    bottom: 0,
  },
  calloutContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  calloutTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  calloutPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#0A84FF',
    marginBottom: 4,
  },
  calloutType: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
});