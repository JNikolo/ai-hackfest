import { useEffect, useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  YStack,
  XStack,
  Text,
  Card,
  Spinner,
  ScrollView,
  Avatar,
} from "tamagui";

type Buddy = {
  id: string;
  name: string;
  bio: string;
  profilePicture?: string;
  distance: number; // in km
};

// 🔁 Dummy buddy data
const dummyBuddies: Buddy[] = [
  {
    id: "1",
    name: "Lena",
    bio: "Looking for a jazz fan to vibe with 🎷",
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    distance: 0.8,
  },
  {
    id: "2",
    name: "Jake",
    bio: "First time attending this event, would love company!",
    profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
    distance: 2.4,
  },
  {
    id: "3",
    name: "Priya",
    bio: "Bringing snacks! Let’s meet up 🍿",
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
    distance: 1.1,
  },
];

export default function BuddiesPage() {
  const { id } = useLocalSearchParams(); // event ID
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay
    const fetchBuddies = async () => {
      setLoading(true);
      setTimeout(() => {
        console.log(`Fetching buddies for event ${id}`);
        setBuddies(dummyBuddies);
        setLoading(false);
      }, 1000); // 1 second delay
    };

    fetchBuddies();
  }, [id]);

  return (
    <>
      <Stack.Screen options={{ title: "Find People Near You" }} />
      <YStack flex={1} p="$4">
        {loading ? (
          <Spinner size="large" />
        ) : buddies.length === 0 ? (
          <Text textAlign="center" mt="$5" color="$black10">
            😔 No one nearby is looking for a buddy yet.
          </Text>
        ) : (
          <ScrollView>
            <YStack gap="$4">
              {buddies.map((buddy) => (
                <Card key={buddy.id} padding="$4" elevate>
                  <XStack alignItems="center" gap="$3">
                    <Avatar circular size="$4">
                      <Avatar.Image
                        source={{
                          uri:
                            buddy.profilePicture ||
                            "https://via.placeholder.com/150",
                        }}
                      />
                      <Avatar.Fallback bc="$gray5" />
                    </Avatar>
                    <YStack flex={1}>
                      <Text fontWeight="700">{buddy.name}</Text>
                      <Text color="$black9" fontSize="$2">
                        {buddy.distance.toFixed(1)} km away
                      </Text>
                    </YStack>
                  </XStack>
                  <Text mt="$3" color="$black10">
                    {buddy.bio}
                  </Text>
                </Card>
              ))}
            </YStack>
          </ScrollView>
        )}
      </YStack>
    </>
  );
}
