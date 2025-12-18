import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login({onVerifiedtoken}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, settoken] = useState("");
  useEffect(() => {
    if(token){
      onVerifiedtoken(token);
    }
 }, [token,onVerifiedtoken]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("https://cunting-backend-5.onrender.com/login", form);

      alert(res.data.message || "Login successful");

      // token save example
      if (res.data.token) {
        settoken(res.data.token)
      }
      navigate("/home")

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center font-poppins  ">
      <form
        onSubmit={submit}
        className="backdrop-blur-xl bg-white/5 p-6 w-80 rounded-lg space-y-4 shadow-lg"
      >
        <h2 className="text-2xl text-white font-bold text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 rounded outline-none focus:ring-2 "
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 rounded outline-none focus:ring-2 "
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-customTeal py-2 text-white rounded  transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="flex justify-between items-center">

          <Link to={"/sendotp"} className="text-white">Reset password </Link>
          <Link to={"/register"} className="text-white">Register </Link>
        </div>
      </form>
    </div>
  );
}
