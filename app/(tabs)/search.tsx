import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Search as SearchIcon, MapPin, X } from 'lucide-react-native';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/utils/mockData';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const filteredProperties = properties.filter(
    property => 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 0) {
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 500);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handlePropertyPress = (id: string) => {
    router.push(`/property/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscar</Text>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por ubicación, tipo o precio..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#8E8E93"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={clearSearch} style={styles.clearButton}>
              <X size={16} color="#8E8E93" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.contentContainer}>
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0A84FF" />
          </View>
        ) : searchQuery.length > 0 ? (
          filteredProperties.length > 0 ? (
            <FlatList
              data={filteredProperties}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Pressable 
                  style={styles.propertyItem} 
                  onPress={() => handlePropertyPress(item.id)}
                >
                  <PropertyCard property={item} />
                </Pressable>
              )}
              contentContainerStyle={styles.propertyList}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No se encontraron propiedades</Text>
              <Text style={styles.noResultsSubtext}>Intenta con otra búsqueda</Text>
            </View>
          )
        ) : (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Búsquedas populares</Text>
            <Pressable style={styles.suggestionItem} onPress={() => handleSearch('Apartamento')}>
              <SearchIcon size={16} color="#0A84FF" />
              <Text style={styles.suggestionText}>Apartamentos</Text>
            </Pressable>
            <Pressable style={styles.suggestionItem} onPress={() => handleSearch('Casa')}>
              <SearchIcon size={16} color="#0A84FF" />
              <Text style={styles.suggestionText}>Casas</Text>
            </Pressable>
            <Pressable style={styles.suggestionItem} onPress={() => handleSearch('Madrid')}>
              <MapPin size={16} color="#0A84FF" />
              <Text style={styles.suggestionText}>Madrid</Text>
            </Pressable>
            <Pressable style={styles.suggestionItem} onPress={() => handleSearch('Barcelona')}>
              <MapPin size={16} color="#0A84FF" />
              <Text style={styles.suggestionText}>Barcelona</Text>
            </Pressable>
          </View>
        )}
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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#333333',
  },
  clearButton: {
    padding: 4,
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  suggestionsContainer: {
    padding: 20,
  },
  suggestionsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  suggestionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#333333',
    marginLeft: 12,
  },
  propertyList: {
    padding: 16,
  },
  propertyItem: {
    marginBottom: 16,
  },
  separator: {
    height: 16,
  },
});