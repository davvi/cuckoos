import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Text } from "@mantine/core";
import type { FactorBreakdown } from "../engine/types";

interface LifespanChartProps {
  factors: FactorBreakdown[];
}

export function LifespanChart({ factors }: LifespanChartProps) {
  const data = factors.map((f) => ({
    name: f.category,
    label: f.label,
    modifier: f.modifier,
  }));

  return (
    <div>
      <Text size="sm" fw={500} mb="sm">
        Factor Breakdown (years)
      </Text>
      <ResponsiveContainer width="100%" height={Math.max(200, factors.length * 40 + 40)}>
        <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
          <XAxis type="number" domain={["dataMin - 1", "dataMax + 1"]} />
          <YAxis type="category" dataKey="name" width={75} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`${Number(value) > 0 ? "+" : ""}${value} years`]}
            labelFormatter={(_label, payload) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const item = (payload as any)?.[0]?.payload;
              return item?.label ?? "";
            }}
          />
          <ReferenceLine x={0} stroke="#868e96" />
          <Bar dataKey="modifier" radius={[4, 4, 4, 4]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.modifier >= 0 ? "#20c997" : "#ff6b6b"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
