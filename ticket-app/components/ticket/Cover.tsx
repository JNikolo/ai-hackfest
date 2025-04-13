import { Image, Text, View, XStack, YStack, Card, Circle } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

export const Cover = () => {
  return (
    <Card
      elevate
      elevation={4}
      width="100%"
      height="100%"
      style={{ borderRadius: 6 }}
      overflow="hidden"
      borderWidth={1}
      borderColor="rgba(255,255,255,0.2)"
      alignContent="center"
      justifyContent="center"
    >
      <Image
        source={require("@/assets/images/wwe.png")}
        width="100%"
        height="100%"
        objectFit="cover"
        position="absolute"
        alt="Ticket"
      />

      <View position="absolute" b={0} l={0} r={0} height="70%">
        <LinearGradient
          width="100%"
          height="100%"
          colors={["transparent", "rgba(0,0,0,1)"]}
          start={[0, 0]}
          end={[0, 1]}
        />
      </View>

      {/* Event info with gradient overlay */}
      <YStack flex={1} justify="flex-end" verticalAlign="center" p="$4">
        <Text
          fontSize="$8"
          color="white"
          fontWeight="800"
          text="center"
          letterSpacing={1}
        >
          WWE LIVE 2025
        </Text>
        <XStack justify="center" verticalAlign="center" gap="$2" mt="$1">
          <Text fontSize="$3" color="rgba(255, 215, 0, 1)" fontWeight="600">
            MADISON SQUARE GARDEN
          </Text>
          <Circle t={5} size={6} bg="rgba(255, 215, 0, 1)" />
          <Text fontSize="$3" color="rgba(255, 215, 0, 1)" fontWeight="600">
            APRIL 25
          </Text>
        </XStack>

        <XStack
          justify="space-between"
          mt="$3"
          pt="$2"
          borderTopWidth={1}
          borderTopColor="rgba(255,255,255,0.3)"
        >
          <Text fontSize="$2" color="white" opacity={0.9}>
            SEAT: RINGSIDE 12
          </Text>
          <Text fontSize="$2" color="white" opacity={0.9}>
            ROW: A
          </Text>
          <Text fontSize="$2" color="white" opacity={0.9}>
            SECTION: 101
          </Text>
        </XStack>
      </YStack>
    </Card>
  );
};
