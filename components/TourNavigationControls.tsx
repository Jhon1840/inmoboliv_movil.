import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

interface TourNavigationControlsProps {
  rooms: string[];
  currentRoom: string;
  onRoomChange: (roomId: string) => void;
}

const getRoomLabel = (roomId: string): string => {
  const roomLabels: Record<string, string> = {
    living: 'Sala de Estar',
    kitchen: 'Cocina',
    bedroom1: 'Dormitorio Principal',
    bedroom2: 'Dormitorio 2',
    bathroom: 'Baño',
    dining: 'Comedor',
    office: 'Oficina',
    backyard: 'Patio',
    entrance: 'Entrada',
    hallway: 'Pasillo'
  };

  return roomLabels[roomId] || roomId;
};

const TourNavigationControls: React.FC<TourNavigationControlsProps> = ({ 
  rooms, 
  currentRoom,
  onRoomChange 
}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {rooms.map((roomId) => (
          <Pressable
            key={roomId}
            style={[
              styles.roomButton,
              currentRoom === roomId && styles.activeRoomButton
            ]}
            onPress={() => onRoomChange(roomId)}
          >
            <Text 
              style={[
                styles.roomButtonText,
                currentRoom === roomId && styles.activeRoomButtonText
              ]}
            >
              {getRoomLabel(roomId)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 12,
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  roomButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 10,
  },
  activeRoomButton: {
    backgroundColor: '#0A84FF',
  },
  roomButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'white',
  },
  activeRoomButtonText: {
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
});

export default TourNavigationControls;