import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

type PropertyStatus = 'pending' | 'sold' | 'closed';
type ActivityType = 'interest' | 'contact' | 'deal' | 'sale' | 'no_action';

interface Activity {
  id: string;
  type: ActivityType;
  date: string;
  description: string;
  user?: string;
}

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  status: PropertyStatus;
  image: string;
  activities: Activity[];
}

// Datos de ejemplo
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Casa Moderna en Las Condes',
    address: 'Av. Apoquindo 4500, Las Condes',
    price: 250000000,
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    activities: [
      {
        id: '1',
        type: 'interest',
        date: '2024-03-15',
        description: 'Usuario mostró interés en la propiedad',
        user: 'Juan Pérez'
      },
      {
        id: '2',
        type: 'contact',
        date: '2024-03-16',
        description: 'Solicitud de visita programada',
        user: 'María González'
      }
    ]
  },
  {
    id: '2',
    title: 'Departamento Centro',
    address: 'Moneda 1000, Santiago Centro',
    price: 85000000,
    status: 'sold',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    activities: [
      {
        id: '3',
        type: 'deal',
        date: '2024-03-10',
        description: 'Oferta aceptada',
        user: 'Carlos Rodríguez'
      },
      {
        id: '4',
        type: 'sale',
        date: '2024-03-12',
        description: 'Venta completada',
        user: 'Carlos Rodríguez'
      }
    ]
  }
];

const getStatusColor = (status: PropertyStatus) => {
  switch (status) {
    case 'pending':
      return '#FFA500';
    case 'sold':
      return '#4CAF50';
    case 'closed':
      return '#F44336';
    default:
      return '#757575';
  }
};

const getStatusText = (status: PropertyStatus) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'sold':
      return 'Vendido';
    case 'closed':
      return 'Cerrado';
    default:
      return 'Desconocido';
  }
};

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'interest':
      return 'heart-outline';
    case 'contact':
      return 'call-outline';
    case 'deal':
      return 'checkmark-done-outline';
    case 'sale':
      return 'checkmark-circle-outline';
    case 'no_action':
      return 'close-circle-outline';
    default:
      return 'help-outline';
  }
};

export default function MyPropertiesScreen() {
  const router = useRouter();
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null);

  const handlePropertyPress = (property: Property) => {
    router.push({
      pathname: '/property/property-history',
      params: { title: property.title }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </Pressable>
        <Text style={styles.headerTitle}>Mis Propiedades</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {mockProperties.map((property) => (
          <Pressable
            key={property.id}
            style={styles.propertyCard}
            onPress={() => handlePropertyPress(property)}
          >
            <Image source={{ uri: property.image }} style={styles.propertyImage} />
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyTitle}>{property.title}</Text>
              <Text style={styles.propertyAddress}>{property.address}</Text>
              <Text style={styles.propertyPrice}>{formatPrice(property.price)}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(property.status) }]}>
                <Text style={styles.statusText}>{getStatusText(property.status)}</Text>
              </View>
            </View>

            {expandedProperty === property.id && (
              <View style={styles.activitiesContainer}>
                <Text style={styles.activitiesTitle}>Historial de Actividades</Text>
                {property.activities.map((activity) => (
                  <View key={activity.id} style={styles.activityItem}>
                    <Ionicons
                      name={getActivityIcon(activity.type)}
                      size={24}
                      color="#666"
                      style={styles.activityIcon}
                    />
                    <View style={styles.activityContent}>
                      <Text style={styles.activityDescription}>{activity.description}</Text>
                      <Text style={styles.activityDate}>{activity.date}</Text>
                      {activity.user && (
                        <Text style={styles.activityUser}>Por: {activity.user}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#333333',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  propertyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  propertyInfo: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A84FF',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  activitiesContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  activitiesTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333333',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 2,
  },
  activityUser: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#0A84FF',
  },
});