import { View, Text, FlatList, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/utils/mockData';

export default function HomeScreen() {
  const router = useRouter();

  const handlePropertyPress = (id: string) => {
    router.push(`/property/${id}`);
  };

  const featuredProperties = properties.filter(p => p.featured);
  const recentProperties = properties
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inmobiliaria Elite</Text>
        <Text style={styles.headerSubtitle}>Encuentra tu hogar ideal</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Propiedades Destacadas</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          >
            {featuredProperties.map((item) => (
              <Pressable 
                key={item.id}
                style={styles.featuredItem}
                onPress={() => handlePropertyPress(item.id)}
              >
                <PropertyCard property={item} featured />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Nuevas Propiedades</Text>
          {recentProperties.map((item) => (
            <Pressable 
              key={item.id} 
              onPress={() => handlePropertyPress(item.id)}
              style={styles.recentItem}
            >
              <PropertyCard property={item} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#333333',
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  featuredSection: {
    paddingTop: 16,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  featuredList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  featuredItem: {
    marginRight: 16,
  },
  recentSection: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  recentItem: {
    marginBottom: 16,
  },
});