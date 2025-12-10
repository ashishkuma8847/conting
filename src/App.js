import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Animated from "./pages/Animated";
import TablePage from "./pages/HolderPage";
import HolderList from "./pages/HolderCard";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Animated />
        <Routes>
           <Route path="/" element={<HolderList />} />
        <Route path="/table/:holderId" element={<TablePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
