import { Card, Text, Badge, Group } from "@mantine/core";
import type { Suggestion } from "../engine/types";
import { CitationLink } from "./CitationLink";

interface SuggestionCardProps {
  suggestion: Suggestion;
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
  return (
    <Card withBorder padding="md" radius="md">
      <Group justify="space-between" mb="xs">
        <Badge color="teal" variant="light">
          +{suggestion.potentialGain} years potential
        </Badge>
      </Group>
      <Text size="sm">{suggestion.text}</Text>
      <CitationLink citations={suggestion.citations} />
    </Card>
  );
}
