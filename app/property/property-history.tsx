import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

type ActivityType = 'interest' | 'contact' | 'deal' | 'sale' | 'no_action';

interface Activity {
  id: string;
  type: ActivityType;
  date: string;
  description: string;
  user?: string;
}

// Datos de ejemplo
const mockActivities: Activity[] = [
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
  },
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
];

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

export default function PropertyHistoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const propertyTitle = params.title as string;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </Pressable>
        <Text style={styles.headerTitle}>Historial de Actividades</Text>
      </View>

      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle}>{propertyTitle}</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {mockActivities.map((activity) => (
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
  propertyInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  propertyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333333',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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