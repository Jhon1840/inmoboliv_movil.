import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, SafeAreaView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ChevronLeft, Heart, Chrome as Home, Bed, Bath, Maximize, MapPin, Phone, MessageSquare } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { properties } from '@/utils/mockData';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const property = properties.find(p => p.id === id);
  
  if (!property) {
    return (
      <View style={styles.container}>
        <Text>Propiedad no encontrada</Text>
      </View>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const startVirtualTour = () => {
    router.push(`/tour/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="white" size={24} />
        </Pressable>
        <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
          <Heart 
            color="white" 
            fill={isFavorite ? "white" : "transparent"} 
            size={24} 
          />
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: property.image }} style={styles.heroImage} />
        
        <View style={styles.contentContainer}>
          <View style={styles.topInfo}>
            <Text style={styles.price}>{property.price}</Text>
            <View style={styles.typeContainer}>
              <Home size={16} color="#0A84FF" />
              <Text style={styles.type}>{property.type}</Text>
            </View>
          </View>
          
          <Text style={styles.title}>{property.title}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#8E8E93" />
            <Text style={styles.location}>{property.location}</Text>
          </View>
          
          <View style={styles.propertyStats}>
            <View style={styles.statItem}>
              <Bed size={20} color="#0A84FF" />
              <Text style={styles.statValue}>{property.beds}</Text>
              <Text style={styles.statLabel}>Dormitorios</Text>
            </View>
            <View style={styles.statItem}>
              <Bath size={20} color="#0A84FF" />
              <Text style={styles.statValue}>{property.baths}</Text>
              <Text style={styles.statLabel}>Baños</Text>
            </View>
            <View style={styles.statItem}>
              <Maximize size={20} color="#0A84FF" />
              <Text style={styles.statValue}>{property.area}</Text>
              <Text style={styles.statLabel}>Área</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{property.description}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Recorrido Virtual</Text>
          <Pressable style={styles.tourButton} onPress={startVirtualTour}>
            <Image 
              source={{ uri: property.tourPreview || property.image }} 
              style={styles.tourPreviewImage}
            />
            <View style={styles.tourOverlay}>
              <View style={styles.tourPlayButton}>
                <Text style={styles.tourButtonText}>Iniciar Recorrido 3D</Text>
              </View>
            </View>
          </Pressable>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Ubicación</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: property.coordinates?.latitude || 40.4168,
                longitude: property.coordinates?.longitude || -3.7038,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: property.coordinates?.latitude || 40.4168,
                  longitude: property.coordinates?.longitude || -3.7038,
                }}
              >
                <View style={styles.markerContainer}>
                  <MapPin size={24} color="#0A84FF" />
                  <View style={styles.markerDot} />
                </View>
              </Marker>
            </MapView>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Agente Inmobiliario</Text>
          <View style={styles.agentContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150' }} 
              style={styles.agentImage}
            />
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>Carlos Gutierrez</Text>
              <Text style={styles.agentCompany}>Inmobiliaria Elite</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Pressable style={styles.messageButton}>
          <MessageSquare size={20} color="#0A84FF" />
          <Text style={styles.messageButtonText}>Mensaje</Text>
        </Pressable>
        <Pressable style={styles.callButton}>
          <Phone size={20} color="white" />
          <Text style={styles.callButtonText}>Llamar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    padding: 20,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#0A84FF',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  type: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#0A84FF',
    marginLeft: 4,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#333333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  propertyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginTop: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#333333',
  },
  tourButton: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  tourPreviewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  tourOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tourPlayButton: {
    backgroundColor: '#0A84FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  tourButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'white',
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  map: {
    width: '100%',
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
  agentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  agentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E5EA',
  },
  agentInfo: {
    marginLeft: 16,
  },
  agentName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  agentCompany: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: 'white',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    padding: 14,
    borderRadius: 12,
    marginRight: 8,
  },
  messageButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0A84FF',
    marginLeft: 8,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A84FF',
    padding: 14,
    borderRadius: 12,
    marginLeft: 8,
  },
  callButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
});