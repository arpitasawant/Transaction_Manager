import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionManager from "./components/TransactionManager";
import TransactionStatistics from "./components/TransactionStatistics";
import BarChart from "./components/Barchart";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionManager />} />
        <Route path="/statistics/:month" element={<TransactionStatistics />} />
        <Route path="/barchart/:month" element={<BarChart />} />
      </Routes>
    </Router>
  );
}

export default App;
