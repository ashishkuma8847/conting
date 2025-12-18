import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword({email}) {
  // email is passed as prop after OTP verification
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
      const url =process.env.REACT_APP_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${url}/reset-password`, {
        email,
        newPassword,
      });

      setMessage(res.data.message || "Password reset successful");
      setNewPassword("");
      localStorage.removeItem("email")
         navigate("/")
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 w-80 rounded-lg space-y-4"
      >
        <h2 className="text-xl text-white font-bold text-center">
          Reset Password
        </h2>

        {message && <p className="text-center text-white">{message}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 rounded outline-none focus:ring-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 py-2 text-white rounded disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
