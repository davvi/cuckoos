import { AppShell, Container, Group, Text } from "@mantine/core";
import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <AppShell header={{ height: 56 }} padding="md">
      <AppShell.Header>
        <Container size="sm" h="100%">
          <Group h="100%" justify="space-between">
            <Text
              component={Link}
              to="/"
              fw={700}
              size="lg"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Cuckoos
            </Text>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="sm">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
