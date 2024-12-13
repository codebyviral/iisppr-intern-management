import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/pageIndex";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
