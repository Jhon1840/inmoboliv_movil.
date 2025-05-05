"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, Pressable, SafeAreaView, Dimensions, Image, Animated, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

const tutorialSteps = [
  {
    title: "Paso 1: Agrega fotos",
    description: "Sube imágenes de alta calidad para destacar tu propiedad y atraer a más interesados.",
    
  },
  {
    title: "Paso 2: Completa la información",
    description: "Llena los detalles como precio, ubicación, características y servicios disponibles.",
     
  },
  {
    title: "Paso 3: Publica",
    description: "Revisa toda la información y publica tu propiedad para que otros la vean inmediatamente.",
   
  },
]

export default function TutorialScreen() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current

  const scrollViewRef = useRef<ScrollView>(null) // <-- Tipo corregido aquí

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      scrollViewRef.current?.scrollTo({
        x: width * (currentStep + 1),
        animated: true,
      })
    } else {
      router.push("/property/new")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      scrollViewRef.current?.scrollTo({
        x: width * (currentStep - 1),
        animated: true,
      })
    }
  }

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  )

  const handleMomentumScrollEnd = (event: any) => { // <-- Agregado tipo explícito 'any' para el evento
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width)
    setCurrentStep(newIndex)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={["#1a2a6c", "#b21f1f", "#fdbb2d"]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Publica tu Propiedad</Text>
      </LinearGradient>

      <View style={styles.progressContainer}>
        {tutorialSteps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              currentStep === index ? styles.progressDotActive : {},
            ]}
          />
        ))}
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {tutorialSteps.map((step, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.iconContainer}>
              <Image source={step.icon} style={styles.icon} />
            </View>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.description}>{step.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.buttonsContainer}>
        {currentStep > 0 && (
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Atrás</Text>
          </Pressable>
        )}

        <Pressable style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={["#4776E6", "#8E54E9"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextButtonText}>
              {currentStep < tutorialSteps.length - 1 ? "Siguiente" : "Comenzar"}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
  },
  progressDotActive: {
    width: 20,
    backgroundColor: "#4776E6",
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: "#333333",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4776E6",
    marginRight: 10,
  },
  backButtonText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#4776E6",
  },
  nextButton: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "white",
  },
})
