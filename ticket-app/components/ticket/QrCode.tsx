import { Image, YStack } from "tamagui";

export const QrCode = () => {
  return (
    <YStack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      borderRadius={12}
      bg="white"
      shadowColor="#000"
      shadowOpacity={0.15}
      shadowOffset={{ width: 0, height: 4 }}
      shadowRadius={12}
      elevation={6}
    >
      <Image
        source={require("@/assets/images/qr.png")}
        width={250}
        height={250}
        objectFit="contain"
        alt="QR"
      />
    </YStack>
  );
};
