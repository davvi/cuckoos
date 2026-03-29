import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "teal",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  defaultRadius: "md",
  components: {
    Button: { defaultProps: { variant: "light" } },
  },
});
