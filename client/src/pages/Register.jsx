import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  AtSign,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  LogIn,
  Chrome,
  Github,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../services/authServices.js";

/**
 * MAIN APP COMPONENT (Handles View State)
 */
const Register = () => {
  const initialFormData = {
    name: "",
    username: "",
    email: "",
    password: "",
    agreeToTerms: false,
  };

  const [view, setView] = useState("register"); // 'register' | 'login'
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // backend api call submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullname: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      setIsSubmitting(true);

      await toast.promise(register(payload), {
        loading: "Creating Account...",
        success: (res) => {
          setFormData(initialFormData);

          console.log("REGISTER SUCCESS: ", res.data);
          setTimeout(() => {
            setIsSuccess(true);
          }, 1500);
          setRegisteredUser(res.data.user);
          return res.message || "Account created successfully!";
        },
        error: (err) => err?.response?.data?.message || "Registration Failed",
      });
    } catch (error) {
      console.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // navigate
  const navigate = useNavigate();

  // Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-10 text-center border border-slate-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-slate-500 mb-8">
            Welcome aboard,{" "}
            <span className="font-semibold text-slate-700">
              {registeredUser?.fullname}
            </span>
            . Your account has been created successfully.
          </p>
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200"
            onClick={() => {
              setIsSuccess(false);
              navigate("/login");
            }}
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans antialiased text-slate-900 transition-all duration-500">
      <div className="max-w-lg w-full">
        {view === "register" ? (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Branding/Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Join Finflow
              </h1>
              <p className="text-slate-500 mt-2">
                Start your journey to better financial health
              </p>
            </div>

            {/* Registration Form Card */}
            <div className="bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Username
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <AtSign className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                        placeholder="rahul_dev"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                        placeholder="rahul@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 py-2">
                    <div className="flex items-center h-5">
                      <input
                        id="agree"
                        name="agreeToTerms"
                        type="checkbox"
                        // required
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
                      />
                    </div>
                    <label
                      htmlFor="agree"
                      className="text-sm text-slate-500 leading-tight cursor-pointer"
                    >
                      I agree to the{" "}
                      <span className="font-bold text-slate-700">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="font-bold text-slate-700">
                        Privacy Policy
                      </span>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="bg-slate-50/50 p-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <LoginView onNavigateToRegister={() => setView("register")} />
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mt-8 text-slate-400">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Secure AES-256 Encryption
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
