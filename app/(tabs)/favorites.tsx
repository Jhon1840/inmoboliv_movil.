import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Heart } from 'lucide-react-native';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/utils/mockData';

// For demo purposes, we'll assume these properties are favorites
const favoriteProperties = properties.filter((_, index) => index % 3 === 0);

export default function FavoritesScreen() {
  const router = useRouter();

  const handlePropertyPress = (id: string) => {
    router.push(`/property/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
      </View>

      {favoriteProperties.length > 0 ? (
        <FlatList
          data={favoriteProperties}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable onPress={() => handlePropertyPress(item.id)}>
              <PropertyCard property={item} />
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Heart size={48} color="#E5E5EA" />
          <Text style={styles.emptyTitle}>No hay favoritos</Text>
          <Text style={styles.emptySubtitle}>
            Agrega propiedades a tus favoritos para verlas aquí
          </Text>
        </View>
      )}
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
  listContent: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    maxWidth: 250,
  },
});