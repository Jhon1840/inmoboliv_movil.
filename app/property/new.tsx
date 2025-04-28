import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Camera, MapPin, Upload, Plus } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';

export default function NewPropertyScreen() {
  const router = useRouter();
  const [location, setLocation] = useState({
    latitude: 40.4168,
    longitude: -3.7038,
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    beds: '',
    baths: '',
    area: '',
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#333333" />
        </Pressable>
        <Text style={styles.headerTitle}>Nueva Propiedad</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Fotos de la Propiedad</Text>
            <View style={styles.imageGrid}>
              <Pressable style={styles.addImageButton}>
                <Camera size={32} color="#0A84FF" />
                <Text style={styles.addImageText}>Foto Principal</Text>
              </Pressable>
              <Pressable style={styles.addImageButton}>
                <Plus size={32} color="#0A84FF" />
                <Text style={styles.addImageText}>Agregar Foto</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Información Básica</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholder="Ej: Apartamento moderno en el centro"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Describe tu propiedad..."
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Precio</Text>
              <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(text) => setFormData({ ...formData, price: text })}
                placeholder="Ej: €200,000"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo de Propiedad</Text>
              <TextInput
                style={styles.input}
                value={formData.type}
                onChangeText={(text) => setFormData({ ...formData, type: text })}
                placeholder="Ej: Apartamento, Casa, Chalet"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Dormitorios</Text>
                <TextInput
                  style={styles.input}
                  value={formData.beds}
                  onChangeText={(text) => setFormData({ ...formData, beds: text })}
                  placeholder="Ej: 2"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Baños</Text>
                <TextInput
                  style={styles.input}
                  value={formData.baths}
                  onChangeText={(text) => setFormData({ ...formData, baths: text })}
                  placeholder="Ej: 1"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Área (m²)</Text>
              <TextInput
                style={styles.input}
                value={formData.area}
                onChangeText={(text) => setFormData({ ...formData, area: text })}
                placeholder="Ej: 80"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Ubicación</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dirección</Text>
              <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholder="Ej: Calle Principal 123, Madrid"
              />
            </View>

            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  ...location,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                onPress={(e) => setLocation(e.nativeEvent.coordinate)}
              >
                <Marker coordinate={location}>
                  <MapPin size={24} color="#0A84FF" />
                </Marker>
              </MapView>
            </View>
          </View>

          <View style={styles.tourSection}>
            <Text style={styles.sectionTitle}>Recorrido Virtual</Text>
            <Pressable style={styles.uploadButton}>
              <Upload size={24} color="#0A84FF" />
              <Text style={styles.uploadText}>Subir fotos 360°</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Publicar Propiedad</Text>
        </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  imageSection: {
    marginBottom: 24,
  },
  imageGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  addImageButton: {
    width: 120,
    height: 120,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
  },
  addImageText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#0A84FF',
    marginTop: 8,
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#333333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  locationSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  tourSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0A84FF',
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  submitButton: {
    backgroundColor: '#0A84FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
});