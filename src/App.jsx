import Home from "./components/Home";
import { AuthProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
