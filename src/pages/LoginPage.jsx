import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LuLock, LuUser } from "react-icons/lu";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { AuthContext } from "../context/AuthContext";
import { validators, runValidation, hasErrors } from "../utils/validators";

const VALIDATION_RULES = {
  username: (v) => validators.required(v, "Username"),
  password: (v) => validators.required(v, "Password"),
};

const LoginPage = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = runValidation(values, VALIDATION_RULES);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await login(values.username, values.password);
      toast.success("Welcome back!");
      navigate("/", { replace: true });
    } catch (error) {
      const message =
        error.response?.status === 400 || error.response?.status === 401
          ? "Invalid username or password."
          : error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white border border-slate-100 rounded-xl shadow-sm p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-slate-800">
            User<span className="text-primary">Directory</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to manage your users</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Input
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="emilys"
              required
            />
            <LuUser className="absolute right-3 top-[38px] text-slate-300" size={16} />
          </div>

          <div className="relative">
            <Input
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="emilyspass"
              required
            />
            <LuLock className="absolute right-3 top-[38px] text-slate-300" size={16} />
          </div>

          <Button type="submit" isLoading={isSubmitting} fullWidth className="mt-2">
            Sign In
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-400 text-center">
          Demo credentials (DummyJSON): <br />
          <span className="font-mono text-slate-500">emilys</span> /{" "}
          <span className="font-mono text-slate-500">emilyspass</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
