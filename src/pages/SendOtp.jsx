import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OtpFlow({onVerified,token}) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: send OTP, 2: verify OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
      const url =process.env.REACT_APP_API_URL

  useEffect(() => {
   if (message === "OTP verified successfully") {
     onVerified(email);
   }
 }, [message, email, onVerified]);
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${url}/send-otp`, { email },{ headers: { Authorization: `Bearer ${token}` } });
      
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:3000/verify-otp", { email, otp });
      setMessage(res.data.message || "OTP verified successfully");
      navigate("/resetpassword")
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center font-poppins ">
      <form className="backdrop-blur-xl bg-white/5 p-6 w-80 rounded-lg space-y-4 shadow-lg">
        <h2 className="text-2xl text-white font-bold text-center">
          {step === 1 ? "Send OTP" : "Verify OTP"}
        </h2>

        {message && <p className="text-center text-white">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          disabled={step !== 1}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded outline-none focus:ring-2"
        />

        {step === 2 && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 rounded outline-none focus:ring-2"
          />
        )}

        {step === 1 ? (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-customTeal py-2 text-white rounded transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full bg-customTeal py-2 text-white rounded transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        )}
      </form>
    </div>
  );
}
