import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Navigation from "./routers/router";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "./utils/theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
