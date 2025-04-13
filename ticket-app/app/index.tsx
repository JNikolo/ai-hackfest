import { StyleSheet, View, Text } from 'react-native';

import BackgroundVideo from '@/components/BackgroundVideo';
import { useFonts } from 'expo-font';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    'GreatVibes': require('../assets/fonts/GreatVibes-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      {/* Background video filling the entire screen */}
      <BackgroundVideo />
      <View style={styles.overlay}>
        <Text style={styles.title}>Lumora</Text>
        <Text style={styles.phrase}>Find Your Spark!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Ensures the overlay also fills the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent overlay
  },
  title: {
    fontSize: 100,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  phrase: {
    fontSize: 50,
    fontFamily: 'GreatVibes',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
});