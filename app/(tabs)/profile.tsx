import { View, Text, StyleSheet, ScrollView, Image, Pressable, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Settings, BellRing, Building, Clock, CircleHelp as HelpCircle, LogOut, Plus, Chrome as Home } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleAddProperty = () => {
    router.push('/property/tutorial');
  };

  const handleMyProperties = () => {
    router.push('/property/my-properties');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Perfil</Text>
          <Pressable style={styles.settingsButton}>
            <Settings size={24} color="#333333" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Maria Rodriguez</Text>
              <Text style={styles.profileEmail}>maria.rodriguez@example.com</Text>
            </View>
          </View>
          <Pressable style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Editar Perfil</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Propiedades</Text>
          <View style={styles.propertiesContainer}>
            <Pressable style={styles.addPropertyCard} onPress={handleAddProperty}>
              <View style={styles.addPropertyContent}>
                <Plus size={32} color="#0A84FF" />
                <Text style={styles.addPropertyText}>Publicar Propiedad</Text>
                <Text style={styles.addPropertySubtext}>Comienza a vender o alquilar tu propiedad</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mi Cuenta</Text>
          <View style={styles.menuCard}>
            <Pressable style={styles.menuItem} onPress={handleMyProperties}>
              <Building size={22} color="#0A84FF" />
              <Text style={styles.menuItemText}>Mis Propiedades</Text>
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Clock size={22} color="#0A84FF" />
              <Text style={styles.menuItemText}>Historial de Visitas</Text>
            </Pressable>
            <Pressable style={styles.menuItem}>
              <BellRing size={22} color="#0A84FF" />
              <Text style={styles.menuItemText}>Notificaciones</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soporte</Text>
          <View style={styles.menuCard}>
            <Pressable style={styles.menuItem}>
              <HelpCircle size={22} color="#0A84FF" />
              <Text style={styles.menuItemText}>Ayuda y Soporte</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.logoutButton}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </Pressable>

        <Text style={styles.versionText}>Versión 1.0.0</Text>
      </ScrollView>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#333333',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E5E5EA',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  editProfileButton: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  editProfileText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0A84FF',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
  },
  propertiesContainer: {
    gap: 12,
  },
  addPropertyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addPropertyContent: {
    alignItems: 'center',
    padding: 20,
  },
  addPropertyText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginTop: 12,
    marginBottom: 4,
  },
  addPropertySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  myPropertiesCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  myPropertiesContent: {
    alignItems: 'center',
    padding: 20,
  },
  myPropertiesText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginTop: 12,
    marginBottom: 4,
  },
  myPropertiesSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  propertyStatsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  propertyStatItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#333333',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#FF3B30',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 32,
  },
});