import React, { useEffect, useState } from "react";
import { Stack, Link } from "expo-router";
import {
  YStack,
  Input,
  Text,
  Card,
  ScrollView,
  Switch,
  XStack,
  Label,
  Spinner,
} from "tamagui";

// Dummy data
const dummyEvents = [
  { id: 1, name: "Jazz Night NYC", location: "Manhattan" },
  { id: 2, name: "Tech Conference 2025", location: "Brooklyn" },
  { id: 3, name: "Open Mic Poetry", location: "Queens" },
  { id: 4, name: "Food Festival", location: "Bronx" },
  { id: 5, name: "Startup Meetup", location: "Downtown" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [useSemantic, setUseSemantic] = useState(false);
  const [similarEvents, setSimilarEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredEvents = dummyEvents.filter((event) =>
    event.name.toLowerCase().includes(query.toLowerCase())
  );

  // 🔍 Semantic similarity search
  const fetchSimilarEvents = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch("https://your-api.com/semantic-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: text }),
      });
      const data = await response.json();
      setSimilarEvents(data.events || []);
    } catch (err) {
      console.error("Semantic search error:", err);
      setSimilarEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (useSemantic && query.trim().length > 2) {
      fetchSimilarEvents(query);
    } else {
      setSimilarEvents([]);
    }
  }, [query, useSemantic]);

  return (
    <>
      <Stack.Screen options={{ title: "Search Events" }} />
      <YStack p="$4" gap="$4" flex={1}>
        <Input
          placeholder="Search events..."
          value={query}
          onChangeText={setQuery}
          size="$4"
        />
        <XStack alignItems="center" justifyContent="space-between">
          <Label>
            <Text fontSize="$4" color="$white2">
              Natural Search
            </Text>
          </Label>
          <Switch
            size="$3"
            checked={useSemantic}
            onCheckedChange={() => setUseSemantic((prev) => !prev)}
            backgroundColor={useSemantic ? "$blue4" : "$black4"}
          />
        </XStack>
        <ScrollView>
          {loading && <Spinner size="large" mx="$4" />}
          {!loading && query.trim() && (
            <>
              {useSemantic ? (
                <>
                  {similarEvents.length > 0 ? (
                    <>
                      <Text fontWeight="700" fontSize="$6" mb="$2">
                        Similar Events
                      </Text>
                      {similarEvents.map((event) => (
                        <Link href={`/events/${event.id}`} asChild>
                          <Card
                            key={event.id}
                            marginBottom="$3"
                            padding="$4"
                            elevate
                          >
                            <Text fontSize="$6">{event.name}</Text>
                            <Text color="$black7">{event.location}</Text>
                          </Card>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Text textAlign="center" color="$black9" marginTop="$4">
                      No similar events found
                    </Text>
                  )}
                </>
              ) : (
                <>
                  {filteredEvents.length > 0 ? (
                    <>
                      <Text fontWeight="700" fontSize="$6" mb="$2">
                        Keyword Matches
                      </Text>
                      {filteredEvents.map((event) => (
                        <Link
                          key={event.id}
                          href={`/events/${event.id}`}
                          asChild
                        >
                          <Card
                            key={event.id}
                            marginBottom="$3"
                            padding="$4"
                            elevate
                          >
                            <Text fontSize="$6">{event.name}</Text>
                            <Text color="$black10">{event.location}</Text>
                          </Card>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Text textAlign="center" color="$black9" marginTop="$4">
                      No keyword matches found
                    </Text>
                  )}
                </>
              )}
            </>
          )}
        </ScrollView>
      </YStack>
    </>
  );
}
