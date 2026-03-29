import { Card, Divider, Group, List, SimpleGrid, Stack, Text, ThemeIcon } from "@mantine/core";
import { countryData } from "../data/countries";
import { sexInsights } from "../data/sexInsights";

function fmt(n: number, decimals = 1) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text size="xs" c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: "0.06em" }}>
      {children}
    </Text>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: "var(--mantine-radius-md)",
        background: "var(--mantine-color-teal-0)",
        border: "1px solid var(--mantine-color-teal-1)",
      }}
    >
      <Text size="xs" c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: "0.05em" }} mb={4}>
        {label}
      </Text>
      <Text fw={700} size="lg" lh={1.2}>
        {value}
      </Text>
      {sub && (
        <Text size="xs" c="dimmed" mt={2}>
          {sub}
        </Text>
      )}
    </div>
  );
}

function RiskMeter({
  label,
  value,
  low,
  high,
}: {
  label: string;
  value: number;
  low?: number;
  high?: number;
}) {
  const color =
    high !== undefined && value >= high
      ? "var(--mantine-color-red-5)"
      : low !== undefined && value <= low
        ? "var(--mantine-color-teal-5)"
        : "var(--mantine-color-yellow-5)";

  return (
    <div>
      <Group justify="space-between" mb={4}>
        <Text size="sm">{label}</Text>
        <Text size="sm" fw={600}>
          {fmt(value, 0)}%
        </Text>
      </Group>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          overflow: "hidden",
          background: "var(--mantine-color-gray-1)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(value, 100)}%`,
            background: color,
            borderRadius: 3,
            transition: "width 0.35s ease",
          }}
        />
      </div>
    </div>
  );
}

export function QuestionInsights({
  questionId,
  value,
}: {
  questionId: string;
  value: string | number | undefined;
}) {
  if (questionId === "country" && typeof value === "string") {
    const data = countryData[value];
    if (!data) return null;

    return (
      <Card withBorder radius="lg" p="lg" bg="gray.0">
        <Stack gap="lg">
          <div>
            <SectionLabel>Selected Country Snapshot</SectionLabel>
            <Text size="sm" mt={6}>
              {value} shows a life expectancy of {fmt(data.lifespan)} years, with elevated risk concentrated in the population factors below.
            </Text>
          </div>

          <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm">
            <MiniStat label="Life expectancy" value={`${fmt(data.lifespan)} yrs`} sub={`${fmt(data.hale)} healthy years`} />
            <MiniStat label="Male vs female" value={`${fmt(data.lifespanMale)} / ${fmt(data.lifespanFemale)} yrs`} sub="Life expectancy at birth" />
            <MiniStat label="NCD mortality" value={`${data.ncdMortality}%`} sub="Probability of dying age 30-70 from major NCDs" />
            <MiniStat label="Maternal / under-5" value={`${data.maternalMortality} / ${data.under5Mortality}`} sub="Per 100k births / per 1k live births" />
          </SimpleGrid>

          <Divider />

          <div>
            <SectionLabel>Population Risk Factors</SectionLabel>
            <Text size="xs" c="dimmed" mt={2} mb="md">
              Prevalence among adults in the selected country.
            </Text>
            <Stack gap="sm">
              <RiskMeter label="Tobacco use" value={data.tobaccoUse} low={10} high={25} />
              <RiskMeter label="Obesity" value={data.obesityRate} low={15} high={30} />
              <RiskMeter label="Hypertension" value={data.hypertension} low={25} high={40} />
              <RiskMeter label="Physical inactivity" value={data.physicalInactivity} low={20} high={45} />
            </Stack>
          </div>
        </Stack>
      </Card>
    );
  }

  if (questionId === "sex" && typeof value === "string") {
    const insight = sexInsights[value];
    if (!insight) return null;

    return (
      <Card withBorder radius="lg" p="lg" bg="gray.0">
        <Stack gap="lg">
          <div>
            <SectionLabel>Sex-Specific Health Profile</SectionLabel>
            <Text size="sm" mt={6}>
              {insight.summary}
            </Text>
            <Text size="xs" c="dimmed" mt={6}>
              Global pattern based on WHO Global Health Estimates 2021. This is directional context, not a personal diagnosis.
            </Text>
          </div>

          <div>
            <SectionLabel>Top Causes of Death</SectionLabel>
            <List
              mt="sm"
              spacing="xs"
              icon={
                <ThemeIcon color="teal" variant="light" size={20} radius="xl">
                  <Text size="xs" fw={700}>
                    1
                  </Text>
                </ThemeIcon>
              }
            >
              {insight.topCauses.map((cause, index) => {
                return (
                  <List.Item
                    key={cause}
                    icon={
                      <ThemeIcon color="teal" variant="light" size={20} radius="xl">
                        <Text size="xs" fw={700}>
                          {index + 1}
                        </Text>
                      </ThemeIcon>
                    }
                  >
                    <Text size="sm">{cause}</Text>
                  </List.Item>
                );
              })}
            </List>
          </div>

          <Divider />

          <div>
            <SectionLabel>Key Risk Factors</SectionLabel>
            <Stack gap="sm" mt="sm">
              {insight.riskFactors.map((factor) => (
                <Group key={factor.label} align="flex-start" wrap="nowrap" gap="sm">
                  <ThemeIcon color="teal" variant="light" size={22} radius="xl" mt={2}>
                    <Text size="sm" fw={700}>
                      +
                    </Text>
                  </ThemeIcon>
                  <div>
                    <Text size="sm" fw={600}>
                      {factor.label}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {factor.detail}
                    </Text>
                  </div>
                </Group>
              ))}
            </Stack>
          </div>
        </Stack>
      </Card>
    );
  }

  return null;
}
