import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Email & Password are required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/register", form);
      toast.success("Registration successful! Please login");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Register"}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link className="text-primary" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
