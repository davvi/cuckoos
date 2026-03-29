import { Anchor, Group, Text } from "@mantine/core";
import type { Citation } from "../engine/types";

interface CitationLinkProps {
  citations?: Citation[];
}

export function CitationLink({ citations }: CitationLinkProps) {
  if (!citations?.length) return null;

  return (
    <Group gap="xs" mt={4}>
      <Text size="xs" c="dimmed">
        Sources:
      </Text>
      {citations.map((c, i) => (
        <Anchor key={i} href={c.url} target="_blank" rel="noopener" size="xs" c="dimmed">
          {c.label}
          {i < citations.length - 1 ? ";" : ""}
        </Anchor>
      ))}
    </Group>
  );
}
