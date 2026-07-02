import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post(
        "/auth/register",
        formData
      );

      toast.success(res.data.message);

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      {/* Left Side */}

      <div className="auth-left">

        <h1>TaskFlow 🚀</h1>

        <p>
          Create your account and
          organize your daily work
          smarter than ever.
        </p>

      </div>

      {/* Right Side */}

      <div className="auth-right">

        <form
          className="auth-card"
          onSubmit={registerHandler}
        >

          <h2>Create Account</h2>

          <div className="input-group">

            <FaUser />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <FaLock />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

          </div>

          <button
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

          <p>
            Already have an account?

            <Link to="/">
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;