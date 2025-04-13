import { useLocalSearchParams, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { YStack, Text, Spinner, Card, Button, Input } from "tamagui";

import { Ticket } from "@/components/ticket/Ticket";

type Event = {
  id: string;
  name: string;
  location: string;
  description?: string;
  date?: string;
};

type User = {
  id: string;
  name: string;
};

const userDummy = {
  user: {
    id: "user123",
    name: "John Doe",
  },
};

export default function EventPage() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  const [showTicketInput, setShowTicketInput] = useState(false);
  const [ticketLink, setTicketLink] = useState("");

  useEffect(() => {
    setUser(userDummy.user); // Replace with actual auth
    const fetchEvent = async () => {
      try {
        const eventDummy: Event = {
          id: "1",
          name: "Sample Event",
          location: "New York",
          description: "This is a sample event description.",
          date: "2025-10-01",
        };
        setEvent(eventDummy);
      } catch (err) {
        console.error("Error loading event:", err);
      } finally {
        setLoading(false);
      }
    };

    const checkRegistration = async () => {
      if (!user) return;
      try {
        setIsRegistered(false); // Simulate check
      } catch (err) {
        console.error("Error checking registration:", err);
      }
    };

    fetchEvent();
    checkRegistration();
  }, [id]);

  const handleInitialRegister = () => {
    setShowTicketInput(true);
  };

  const handleFinalRegister = async () => {
    if (!user) return;
    setRegistering(true);
    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //   const payload = {
      //     userId: user.id,
      //     ticketLink: ticketLink || null,
      //   };

      //   await fetch(`https://your-api.com/events/${id}/register`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(payload),
      //   });

      setIsRegistered(true);
      setShowTicketInput(false);
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Event Details" }} />
      <YStack flex={1} p="$4" justifyContent="center" alignItems="center">
        {loading ? (
          <Spinner size="large" />
        ) : isRegistered ? (
          <>
            <Ticket />
            <Button
              width={200}
              onPress={() => router.push(`/events/people/${event.id}`)} // 🔁 replace with your route
            >
              <Text>Find a buddy!</Text>
            </Button>
          </>
        ) : (
          <Card
            width="100%"
            maxWidth={400}
            padding="$4"
            elevate
            alignItems="center"
          >
            <Text fontSize="$8" fontWeight="700" mb="$2" textAlign="center">
              {event?.name}
            </Text>
            <Text color="$black10" mb="$1" textAlign="center">
              📍 {event?.location}
            </Text>
            {event?.date && (
              <Text color="$black10" mb="$2" textAlign="center">
                📅 {event.date}
              </Text>
            )}
            <Text mb="$4" textAlign="center">
              {event?.description || "No description available."}
            </Text>

            {user ? (
              showTicketInput ? (
                <>
                  <Input
                    width="100%"
                    placeholder="Paste your ticket link (optional)"
                    value={ticketLink}
                    onChangeText={setTicketLink}
                    mb="$3"
                  />
                  <Button
                    onPress={handleFinalRegister}
                    disabled={registering}
                    width="100%"
                  >
                    {registering ? "Registering..." : "Submit & Register"}
                  </Button>
                </>
              ) : (
                <Button onPress={handleInitialRegister} width="100%">
                  Register for Event
                </Button>
              )
            ) : (
              <Text color="$yellow10" fontWeight="600">
                🔐 Please log in to register
              </Text>
            )}
          </Card>
        )}
      </YStack>
    </>
  );
}
