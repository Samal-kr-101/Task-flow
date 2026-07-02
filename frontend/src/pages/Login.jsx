import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <h1>TaskFlow 🚀</h1>

        <p>
          Organize your work,
          boost productivity,
          and manage tasks effortlessly.
        </p>

      </div>

      <div className="auth-right">

        <form
          className="auth-card"
          onSubmit={loginHandler}
        >

          <h2>Welcome Back</h2>

          <div className="input-group">

            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Email"
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

          <button className="auth-btn">
            Login
          </button>

          <p>
            Don't have an account?
            <Link to="/register">
              Register
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;