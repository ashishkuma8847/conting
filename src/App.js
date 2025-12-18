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
  const [emailvalue, setemailvalue] = useState("");
  const [tokenvalue, settokenvalue] = useState("");
  return (
    <>
      <BrowserRouter>
        <Animated />
        <Routes>
          {!tokenvalue ? (
            <Route
              path="/"
              element={<Login onVerifiedtoken={(e) => settokenvalue(e)} />}
            />
          ) : (
            <>
              <Route path="/home" element={<HolderList token={tokenvalue} />} />
              <Route path="/table/:holderId" element={<TablePage token={tokenvalue}/>} />
              <Route
                path="/"
                element={<Login onVerifiedtoken={(e) => settokenvalue(e)} />}
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/sendotp"
                element={
                  <SendOtp onVerified={(email) => setemailvalue(email)} />
                }
              />
              <Route
                path="/resetpassword"
                element={<ResetPassword email={emailvalue} />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
