import { useState } from "react";
import { View, Button, ActivityIndicator, StyleSheet, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Crypto from "expo-crypto";

export default function GenerateToken() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const newToken = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        Date.now().toString() + Math.random().toString()
      );

      setToken(newToken);
      console.log(newToken)
    } catch (err) {
      Alert.alert("Error generating token");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.qrBox}>
        {token && <QRCode value={token} size={200} />}
      </View>
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Button title="Generate QR Code" onPress={handleGenerate} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  qrBox: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "60%",
  },
});

