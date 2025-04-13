import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from "react-native-reanimated";
import {
  Button,
  Card,
  Text,
  XStack,
  YStack,
  Image,
  View,
  Circle,
} from "tamagui";

import { QrCode } from "./QrCode";
import { Cover } from "./Cover";

export const Ticket = () => {
  const rotation = useSharedValue(0);

  const flipTicket = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, {
      duration: 900,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateX = interpolate(rotation.value, [0, 180], [0, 180]);
    //const rotateY = interpolate(rotation.value, [0, 180], [0, 180]);
    return {
      transform: [
        { rotateX: `${rotateX}deg` },
        //{ rotateY: `${rotateY}deg` },
        { perspective: 1000 },
      ],
      opacity: rotation.value >= 90 ? 0 : 1,
      backfaceVisibility: "hidden",
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateX = interpolate(rotation.value, [0, 180], [180, 360]);
    //const rotateY = interpolate(rotation.value, [0, 180], [180, 360]);
    return {
      transform: [
        { rotateX: `${rotateX}deg` },
        //{ rotateY: `${rotateY}deg` },
        { perspective: 1000 },
      ],
      opacity: rotation.value >= 90 ? 1 : 0,
      backfaceVisibility: "hidden",
      position: "absolute",
    };
  });

  return (
    <YStack flex={1} justify="center" verticalAlign="center" gap={20}>
      <YStack width={300} height={300}>
        {/* FRONT SIDE */}
        <Animated.View
          style={[frontAnimatedStyle, { width: "100%", height: "100%" }]}
        >
          <Cover />
        </Animated.View>

        {/* BACK SIDE */}
        <Animated.View
          style={[
            backAnimatedStyle,
            {
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            },
          ]}
        >
          <QrCode />
        </Animated.View>
      </YStack>

      <Button
        bg="#222222"
        color="white"
        fontWeight="500"
        size="$3"
        px="$5"
        py="$2"
        pressStyle={{ opacity: 0.85 }}
        onPress={flipTicket}
        icon={
          <View mr="$2">
            <Text fontSize={15} color="white">
              ↻
            </Text>
          </View>
        }
      >
        VERIFY
      </Button>
    </YStack>
  );
};
