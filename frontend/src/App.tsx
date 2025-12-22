import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <Router>
      <ChatWidget />
      <Toaster />
      <ScrollToTop />
    </Router>
  );
}

export default App;
