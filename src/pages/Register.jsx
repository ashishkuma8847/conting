import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const url =process.env.REACT_APP_API_URL

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${url}/register`,
        form
      );
      setSuccess(res.data.message || "Registered successfully");
      setForm({ name: "", email: "", password: "" });
      navigate("/")
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center font-poppins text-white">
      <form
        onSubmit={submit}
        className="backdrop-blur-xl bg-white/5 p-6 w-80 rounded-lg space-y-4 shadow-lg"
      >
        <h2 className="text-2xl text-white font-bold text-center">
          Register
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {success && (
          <p className="text-green-400 text-sm text-center">{success}</p>
        )}

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded text-black outline-none focus:ring-2 "
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 rounded outline-none text-black focus:ring-2 "
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 text-black rounded outline-none focus:ring-2 "
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-customTeal py-2 text-white rounded  transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
