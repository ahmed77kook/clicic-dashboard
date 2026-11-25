import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../data/store";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (login(email, password)) navigate("/");
    else setError("Wrong email or password");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white border rounded-xl p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-teal-600 text-center">🦷 Dental Clinic</h1>
        <p className="text-sm text-gray-500 text-center">Staff login</p>
        <input
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full bg-teal-600 text-white py-2.5 rounded-lg text-sm hover:bg-teal-700">
          Login
        </button>
      </form>
    </div>
  );
}