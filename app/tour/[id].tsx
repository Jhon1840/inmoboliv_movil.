import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import { ChevronLeft, ZoomIn, ZoomOut, Maximize2, Info, X } from 'lucide-react-native';
import { properties } from '@/utils/mockData';
import TourNavigationControls from '@/components/TourNavigationControls';

export default function TourScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const webViewRef = useRef<WebView>(null);
  
  const [loading, setLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState('living');
  const [showInfo, setShowInfo] = useState(false);
  
  const property = properties.find(p => p.id === id);
  
  if (!property) {
    return (
      <View style={styles.container}>
        <Text>Propiedad no encontrada</Text>
      </View>
    );
  }

  // Get the panorama tour HTML
  const getPanoramaHTML = (roomId: string) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>360° Virtual Tour</title>
        <script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css">
        <style>
          body { margin: 0; padding: 0; overflow: hidden; }
          #panorama { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="panorama"></div>
        <script>
          pannellum.viewer('panorama', {
            type: 'equirectangular',
            panorama: '${property.tourRooms[roomId]}',
            autoLoad: true,
            showControls: false,
            compass: false,
            hfov: 110,
            maxHfov: 140,
            minHfov: 50,
            autoRotate: 0.5,
            hotSpots: ${JSON.stringify(property.hotspots[roomId] || [])},
          });

          window.addEventListener('message', function(event) {
            const viewer = window.viewer;
            
            switch(event.data.action) {
              case 'zoomIn':
                pannellum.viewer('panorama').setHfov(pannellum.viewer('panorama').getHfov() - 10);
                break;
              case 'zoomOut':
                pannellum.viewer('panorama').setHfov(pannellum.viewer('panorama').getHfov() + 10);
                break;
              case 'fullScreen':
                if (!document.fullscreenElement) {
                  document.getElementById('panorama').requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
                break;
              case 'changeRoom':
                window.ReactNativeWebView.postMessage(JSON.stringify({type: 'roomChange', roomId: event.data.roomId}));
                break;
            }
          });

          // Handle hotspot clicks
          document.addEventListener('click', function(e) {
            if (e.target.classList.contains('pnlm-hotspot')) {
              const targetScene = e.target.getAttribute('data-target-scene');
              if (targetScene) {
                window.ReactNativeWebView.postMessage(JSON.stringify({type: 'roomChange', roomId: targetScene}));
              }
            }
          }, true);
        </script>
      </body>
      </html>
    `;
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'roomChange' && data.roomId) {
        setCurrentRoom(data.roomId);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  const sendMessageToWebView = (action: string, params = {}) => {
    webViewRef.current?.injectJavaScript(`
      window.postMessage({action: '${action}', ...${JSON.stringify(params)}}, '*');
      true;
    `);
  };

  const handleZoomIn = () => {
    sendMessageToWebView('zoomIn');
  };

  const handleZoomOut = () => {
    sendMessageToWebView('zoomOut');
  };

  const handleFullScreen = () => {
    sendMessageToWebView('fullScreen');
  };

  const changeRoom = (roomId: string) => {
    setCurrentRoom(roomId);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <WebView
        ref={webViewRef}
        source={{ html: getPanoramaHTML(currentRoom) }}
        style={styles.webView}
        onLoad={() => setLoading(false)}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0A84FF" />
          <Text style={styles.loadingText}>Cargando recorrido virtual...</Text>
        </View>
      )}

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="white" size={24} />
        </Pressable>
        <Text style={styles.title}>Recorrido 3D</Text>
        <Pressable style={styles.infoButton} onPress={toggleInfo}>
          <Info color="white" size={20} />
        </Pressable>
      </View>

      <View style={styles.controlsContainer}>
        <Pressable style={styles.controlButton} onPress={handleZoomIn}>
          <ZoomIn color="white" size={20} />
        </Pressable>
        <Pressable style={styles.controlButton} onPress={handleZoomOut}>
          <ZoomOut color="white" size={20} />
        </Pressable>
        <Pressable style={styles.controlButton} onPress={handleFullScreen}>
          <Maximize2 color="white" size={20} />
        </Pressable>
      </View>

      <TourNavigationControls
        rooms={Object.keys(property.tourRooms)}
        currentRoom={currentRoom}
        onRoomChange={changeRoom}
      />

      {showInfo && (
        <View style={styles.infoOverlay}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoTitle}>Cómo usar el tour virtual</Text>
              <Pressable style={styles.closeButton} onPress={toggleInfo}>
                <X color="#333333" size={20} />
              </Pressable>
            </View>
            <Text style={styles.infoText}>
              • Desliza para mirar alrededor en 360°{'\n'}
              • Usa los botones de zoom para acercar o alejar{'\n'}
              • Toca los puntos de interés para navegar a otras habitaciones{'\n'}
              • Selecciona una habitación desde el menú inferior{'\n'}
              • Para una mejor experiencia, utiliza el modo pantalla completa
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
    marginTop: 16,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    right: 16,
    top: height / 2 - 80,
    zIndex: 10,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    padding: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 24,
    color: '#333333',
  },
});