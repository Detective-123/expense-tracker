import { useState, useEffect } from "react";
import { Wallet, Lock, Mail, Eye, EyeOff, Github, Chrome } from "lucide-react";

import toast from "react-hot-toast";
// import services api calls
import { healthCheck } from "../services/healthCheck.js";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices.js";

/**
 * LOGIN COMPONENT
 * A polished, responsive login page with form validation UI.
 */
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // title
  document.title = "Login - BrokeBuddy"

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      await toast.promise(login({ email, password }), {
        loading: "Logging In...",
        success: (res) => {
          setEmail("");
          setPassword("");

          setTimeout(() => {
            navigate("/home");
          }, 1500);
          return res.message || "Logged in successfully";
        },
        error: (err) => err?.response?.data?.message || "Failed to login",
      });

      // console.log("LOGIN SUCCESS", res.data);
    } catch (error) {
      // console.error(error?.response?.data?.message || "Login failed");
      toast.error(error?.response?.data?.message || "Failed to login")
    }
  };

  // navigating to another link
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome to BrokeBuddy
          </h1>
          <p className="text-slate-500 mt-2">Sign in to manage your expenses</p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-slate-600 cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="grow border-t border-slate-100"></div>
              <span className="shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Or continue with
              </span>
              <div className="grow border-t border-slate-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                onClick={() => navigate("/comingsoon")}
              >
                <Chrome className="w-5 h-5 text-slate-600 mr-2" />
                <span className="text-sm font-semibold text-slate-700">
                  Google
                </span>
              </button>
              <button
                className="flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                onClick={() => navigate("/comingsoon")}
              >
                <Github className="w-5 h-5 text-slate-600 mr-2" />
                <span className="text-sm font-semibold text-slate-700">
                  Github
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-slate-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700"
          >
            Create one for free
          </span>
        </p>
      </div>
    </div>
  );
};

/**
 * ROOT APP COMPONENT
 * Handles routing between Login and Dashboard views.
 */
const Login = () => {
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Switch between Login and Dashboard
  return (
    <div className="font-sans antialiased text-slate-900">
      <LoginPage onLogin={handleLogin} />
    </div>
  );
};

export default Login;
