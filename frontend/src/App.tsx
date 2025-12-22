import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Home />
      <Toaster />
      <ScrollToTop />
    </Router>
  );
}

export default App;
