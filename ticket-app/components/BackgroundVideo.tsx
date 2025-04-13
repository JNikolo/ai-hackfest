// BackgroundVideo.tsx
import { Video, ResizeMode } from 'expo-av';
import { StyleSheet, View } from 'react-native';

import { ViewStyle } from 'react-native';

export default function BackgroundVideo() {
  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/videos/background.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        isMuted
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // Keep it in the background
  },
});
