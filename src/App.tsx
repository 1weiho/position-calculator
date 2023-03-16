import { GeistProvider, CssBaseline } from "@geist-ui/core";
import Calculator from "./Calculator";

function App() {
  return (
    <GeistProvider>
      <CssBaseline />
      <Calculator />
    </GeistProvider>
  );
}

export default App;
