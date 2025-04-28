import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Bed, Bath, Maximize, Heart, MapPin } from 'lucide-react-native';
import { PropertyType } from '@/utils/types';

interface PropertyCardProps {
  property: PropertyType;
  featured?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  return (
    <View style={[styles.container, featured && styles.featuredContainer]}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: property.image }} 
          style={featured ? styles.featuredImage : styles.image}
          resizeMode="cover"
        />
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{property.type}</Text>
        </View>
        {property.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Destacado</Text>
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.price}>{property.price}</Text>
        <Text style={styles.title} numberOfLines={2}>{property.title}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#8E8E93" />
          <Text style={styles.location} numberOfLines={1}>{property.location}</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Bed size={14} color="#0A84FF" />
            <Text style={styles.statText}>{property.beds}</Text>
          </View>
          <View style={styles.statItem}>
            <Bath size={14} color="#0A84FF" />
            <Text style={styles.statText}>{property.baths}</Text>
          </View>
          <View style={styles.statItem}>
            <Maximize size={14} color="#0A84FF" />
            <Text style={styles.statText}>{property.area}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  featuredContainer: {
    width: width * 0.75,
    marginRight: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  contentContainer: {
    padding: 12,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#0A84FF',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#333333',
    marginLeft: 4,
  },
  typeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  typeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#0A84FF',
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#E6B980',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  featuredText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: 'white',
  },
});

export default PropertyCard;