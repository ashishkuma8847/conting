import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Animated from "./pages/Animated";
import TablePage from "./pages/HolderPage";
import HolderList from "./pages/HolderCard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SendOtp from "./pages/SendOtp";
import ResetPassword from "./pages/ResetPassword";
import { useState } from "react";

function App() {
  const [emailvalue,setemailvalue]=useState("")
  return (
    <>
      <BrowserRouter>
        <Animated />
        <Routes>
           <Route path="/home" element={<HolderList />} />
        <Route path="/table/:holderId" element={<TablePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sendotp" element={<SendOtp onVerified={(email) => setemailvalue(email)}/>} />
        <Route path="/resetpassword" element={<ResetPassword  email={emailvalue}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
