import { StyleSheet, View, Text, Pressable } from "react-native";
import BackgroundVideo from "@/components/BackgroundVideo";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    GreatVibes: require("../assets/fonts/GreatVibes-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  const handlePress = () => {
    router.push("/events"); // Replace '/search' with your target route
  };

  return (
    <View style={styles.container}>
      <BackgroundVideo />

      <Pressable style={styles.overlay} onPress={handlePress}>
        <Text style={styles.title}>Lumora</Text>
        <Text style={styles.phrase}>Find Your Spark!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: 100,
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  phrase: {
    fontSize: 50,
    fontFamily: "GreatVibes",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
});
