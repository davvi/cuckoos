import { Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  countryData,
  incomeLevelLabels,
  regionLabels,
  type CountryData,
} from "../data/countries";

// ── helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 1) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtPop(millions: number) {
  if (millions >= 1000) return `${fmt(millions / 1000, 1)}B`;
  if (millions >= 1) return `${fmt(millions, 1)}M`;
  return `${fmt(millions * 1000, 0)}K`;
}

// ── sub-components ────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}

function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div
      style={{
        padding: "14px 16px",
        border: "1px solid var(--mantine-color-gray-2)",
        borderRadius: "var(--mantine-radius-md)",
        background: accent ? "var(--mantine-color-teal-0)" : "white",
      }}
    >
      <Text size="xs" c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: "0.04em" }} mb={4}>
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

interface RiskBarProps {
  label: string;
  value: number;
  unit?: string;
  low?: number;   // below = good
  high?: number;  // above = bad
}

function RiskBar({ label, value, unit = "%", low, high }: RiskBarProps) {
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
          {fmt(value, 0)}{unit}
        </Text>
      </Group>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: "var(--mantine-color-gray-1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(value, 100)}%`,
            background: color,
            borderRadius: 3,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Text
      size="xs"
      c="dimmed"
      tt="uppercase"
      fw={700}
      style={{ letterSpacing: "0.06em" }}
    >
      {children}
    </Text>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface CountryProfileProps {
  countryName: string;
}

export function CountryProfile({ countryName }: CountryProfileProps) {
  const data: CountryData | undefined = countryData[countryName];
  if (!data) return null;

  const genderGap = (data.lifespanFemale - data.lifespanMale).toFixed(1);

  return (
    <Stack gap="xl">
      {/* ── Country header ── */}
      <div>
        <Text fw={700} size="xl" mb={2}>
          {countryName}
        </Text>
        <Group gap="md">
          <Text size="sm" c="dimmed">
            {regionLabels[data.region]}
          </Text>
          <Text size="xs" c="dimmed">·</Text>
          <Text size="sm" c="dimmed">
            {incomeLevelLabels[data.incomeLevel]}
          </Text>
          <Text size="xs" c="dimmed">·</Text>
          <Text size="sm" c="dimmed">
            Pop. {fmtPop(data.population)}
          </Text>
          <Text size="xs" c="dimmed">·</Text>
          <Text size="sm" c="dimmed">
            Health exp. {fmt(data.healthExpenditure, 1)}% of GDP
          </Text>
        </Group>
      </div>

      {/* ── Life expectancy ── */}
      <div>
        <SectionHeader>Life Expectancy at Birth</SectionHeader>
        <SimpleGrid cols={{ base: 2, sm: 4 }} mt="sm" spacing="sm">
          <StatCard label="Both sexes" value={`${fmt(data.lifespan)} yrs`} accent />
          <StatCard label="Male" value={`${fmt(data.lifespanMale)} yrs`} />
          <StatCard label="Female" value={`${fmt(data.lifespanFemale)} yrs`} />
          <StatCard
            label="Healthy (HALE)"
            value={`${fmt(data.hale)} yrs`}
            sub={`${fmt(data.lifespan - data.hale, 1)} yrs in poor health`}
          />
        </SimpleGrid>
        <Text size="xs" c="dimmed" mt="xs">
          Female life expectancy exceeds male by {genderGap} years · WHO GHO 2021
        </Text>
      </div>

      <Divider />

      {/* ── NCD mortality + child/maternal ── */}
      <div>
        <SectionHeader>Mortality Indicators</SectionHeader>
        <SimpleGrid cols={{ base: 1, sm: 3 }} mt="sm" spacing="sm">
          <StatCard
            label="NCD mortality (age 30–70)"
            value={`${data.ncdMortality}%`}
            sub="Probability of dying from CVD, cancer, diabetes, or CRD"
          />
          <StatCard
            label="Under-5 mortality"
            value={`${data.under5Mortality}`}
            sub="deaths per 1,000 live births"
          />
          <StatCard
            label="Maternal mortality"
            value={`${data.maternalMortality}`}
            sub="deaths per 100,000 live births"
          />
        </SimpleGrid>
      </div>

      <Divider />

      {/* ── Risk factors ── */}
      <div>
        <SectionHeader>Population Risk Factors</SectionHeader>
        <Text size="xs" c="dimmed" mt={2} mb="md">
          Prevalence among adults · WHO GHO / NCD-RisC
        </Text>
        <Stack gap="sm">
          <RiskBar label="Tobacco use" value={data.tobaccoUse} low={10} high={25} />
          <RiskBar label="Obesity (BMI ≥ 30)" value={data.obesityRate} low={15} high={30} />
          <RiskBar label="Hypertension (raised BP)" value={data.hypertension} low={25} high={40} />
          <RiskBar label="Physical inactivity" value={data.physicalInactivity} low={20} high={45} />
        </Stack>
        <Group gap="lg" mt="sm">
          <Group gap={4}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--mantine-color-teal-5)" }} />
            <Text size="xs" c="dimmed">Low risk</Text>
          </Group>
          <Group gap={4}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--mantine-color-yellow-5)" }} />
            <Text size="xs" c="dimmed">Moderate</Text>
          </Group>
          <Group gap={4}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--mantine-color-red-5)" }} />
            <Text size="xs" c="dimmed">High risk</Text>
          </Group>
        </Group>
      </div>
    </Stack>
  );
}
