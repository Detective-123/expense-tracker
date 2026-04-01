import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  PlusCircle,
  MinusCircle,
  Wallet,
  TrendingUp,
  TrendingDown,
  Trash2,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Tag,
  Menu,
  X,
  Bell,
  User,
  LayoutDashboard,
  BarChart3,
  Settings,
  EllipsisVerticalIcon,
  Eye,
  Edit2,
  LogOut,
  MoreVertical,
} from "lucide-react";
import { Link } from "react-router-dom";

// import api services
import { getUser } from "../services/authServices.js";
import {
  createExpense,
  getExpense,
  deleteExpense,
} from "../services/expenseService.js";
import toast from "react-hot-toast";

const Home = () => {
  // --- State ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [registeredUser, setRegisteredUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  // const [open, setOpen] = useState(false)
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    text: "",
    amount: "",
    category: "General",
    type: "expense",
  });

  // useEffect hook renders once after the page reloads
  useEffect(() => {
    // gets user
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user) {
          setRegisteredUser(user.data);
        }
        // console.log(user.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
    // gets expenses
    const fetchExpense = async () => {
      try {
        const data = await getExpense();
        console.log(data.data);

        /*
        const expenseObj = {
          id: expense.data[0]._id,
          text: expense.data[0].title,
          amount: expense.data[0].amount,
          category: expense.data[0].category,
          type: expense.data[0].type,
          date: expense.data[0].createdAt,
        };
        */

        setExpenses(data.data);

        // console.log(expenseObj);
      } catch (error) {
        console.log("FULL ERROR:", error);
        toast.error(
          error?.response?.data?.message || "Failed to fetch expenses",
        );
      }
    };
    fetchExpense();
  }, []);

  // for dropdown state changes
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  // --- Derived Calculations ---
  const totals = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const income = expenses
      .filter((t) => {
        const date = new Date(t.createdAt);
        return (
          t.type === "income" &&
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      })
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const expense = expenses
      .filter((t) => {
        const date = new Date(t.createdAt);
        return (
          t.type === "expense" &&
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      })
      .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);

    const balance = income - expense;

    return { income, expense, balance };
  }, [expenses]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    if (!formData.text || !formData.amount) return;

    try {
      const payload = {
        title: formData.text,
        amount: Number(formData.amount),
        category: formData.category,
        type: formData.type,
      };

      const res = await createExpense(payload);
      console.log(res.data.expense);
      // // re fetch from backend
      // const updated = await getExpense();
      // setExpenses(updated.data);

      setExpenses((prev) => [res.data.expense, ...prev]);

      console.log("TYPE: ", formData.type);
      setFormData({
        text: "",
        amount: "",
        category: "General",
        type: "expense",
      });

      toast.success("Transaction added successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add transaction",
      );
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteExpense(id);

      setExpenses((prev) => prev.filter((t) => t._id !== id));
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0, // Common for INR tracking to keep it clean, set to 2 if paise are needed
    }).format(num);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/home" },
    { name: "Reports", icon: BarChart3, path: "/comingsoon" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <div className="shrink-0 flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600">
                  Finflow
                </span>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:ml-8 md:flex md:space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setActiveTab(item.name)}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.name
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-900 leading-none">
                    {registeredUser?.user?.fullname}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Free Plan</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold overflow-hidden">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === item.name
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="w-5 h-4 mr-3" />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-slate-100">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                    <User className="w-6 h-6" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-slate-800">
                    {registeredUser.user.fullname}
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    {registeredUser.user.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Dashboard Header Section */}
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                Financial Overview
              </h1>
              <p className="text-slate-500">
                Manage your transactions in INR and track your budget status.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats and Table */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg w-fit mb-4">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 text-sm font-medium">
                    Total Balance
                  </span>
                  <span
                    className={`text-2xl font-bold mt-1 ${totals.balance >= 0 ? "text-slate-800" : "text-rose-600"}`}
                  >
                    {formatCurrency(totals.balance)}
                  </span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg w-fit mb-4">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 text-sm font-medium">
                    Monthly Income
                  </span>
                  <span className="text-2xl font-bold mt-1 text-emerald-600">
                    {formatCurrency(totals.income)}
                  </span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="bg-rose-50 text-rose-600 p-2 rounded-lg w-fit mb-4">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 text-sm font-medium">
                    Monthly Expenses
                  </span>
                  <span className="text-2xl font-bold mt-1 text-rose-600">
                    {formatCurrency(totals.expense)}
                  </span>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-indigo-500" />
                    Transaction History
                  </h2>
                  <div className="flex gap-2">
                    <button className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded hover:bg-slate-200 cursor-pointer transition-colors">
                      Export CSV
                    </button>
                    <button className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 cursor-pointer transition-colors">
                      Filters
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Transaction</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {expenses.length > 0 ? (
                        expenses.map((t) => (
                          <tr
                            key={t?._id}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-full ${t.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
                                >
                                  {t.type === "income" ? (
                                    <ArrowUpRight className="w-4 h-4" />
                                  ) : (
                                    <ArrowDownLeft className="w-4 h-4" />
                                  )}
                                </div>
                                <span className="font-semibold text-slate-700">
                                  {t.title}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[11px] font-bold uppercase">
                                <Tag className="w-3 h-3" />
                                {t.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                              {formatDate(t.createdAt)}
                            </td>
                            <td
                              className={`px-6 py-4 text-right font-bold ${t.type === "income" ? "text-emerald-600" : "text-rose-600"}`}
                            >
                              {t.type === "income" ? "+" : "-"}
                              {formatCurrency(t.amount)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="relative inline-block">
                                <button
                                  onClick={() => toggleDropdown(t._id)}
                                  className="text-black-400 hover:text-black-600 transition-colors opacity-100 group-hover:opacity-100 p-1"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                                {/* Dropdown menu */}
                                {activeDropdownId === t._id && (
                                  <div className="absolute right-6 mt-2 w-44 bg-white shadow-xl rounded-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                    <ul>
                                      <li className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700 flex items-center gap-3 transition-colors">
                                        <Eye className="w-4 h-4 text-slate-400" />{" "}
                                        View Details
                                      </li>
                                      <li className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-indigo-600 font-medium flex items-center gap-3 transition-colors">
                                        <Edit2 className="w-4 h-4" /> Edit
                                        Expense
                                      </li>
                                      <li className="my-1 border-t border-slate-50"></li>
                                      <li
                                      onClick={() => deleteTransaction(t._id)} 
                                      className="px-4 py-2 hover:bg-rose-50 cursor-pointer text-sm text-rose-600 flex items-center gap-3 transition-colors">
                                        <Trash2 className="w-4 h-4" /> Delete
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-6 py-12 text-center text-slate-400 italic"
                          >
                            No data available for this period.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Entry Form and Insights */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold mb-6 text-slate-800">
                  Quick Entry
                </h2>
                <form onSubmit={addTransaction} className="space-y-4">
                  {/* Selector Toggle */}
                  <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, type: "expense" })
                      }
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                        formData.type === "expense"
                          ? "bg-white text-rose-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-600"
                      }`}
                    >
                      <MinusCircle className="w-4 h-4" />
                      Expense
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, type: "income" })
                      }
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                        formData.type === "income"
                          ? "bg-white text-emerald-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-600"
                      }`}
                    >
                      <PlusCircle className="w-4 h-4" />
                      Income
                    </button>
                  </div>

                  {/* Input: Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">
                      Description
                    </label>
                    <input
                      type="text"
                      name="text"
                      required
                      value={formData.text}
                      onChange={handleInputChange}
                      placeholder="e.g., Dinner at Taj"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Input: Amount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">
                      Amount (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="amount"
                        required
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="1"
                        className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Input: Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option value="General">General</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Health">Health</option>
                        <option value="Bills">Bills</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <Tag className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-200/50 transition-all active:scale-[0.98] mt-4 hover:-translate-y-0.5 ${
                      formData.type === "income"
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    Confirm Transaction
                  </button>
                </form>
              </div>

              {/* Promo Card */}
              <div className="bg-linear-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-300" />
                    Savings Goal
                  </h3>
                  <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                    Your savings rate is up{" "}
                    <span className="text-white font-bold">12%</span> compared
                    to last month. Keep building your emergency fund!
                  </p>
                  <button className="text-xs font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm">
                    View Budget Plan
                  </button>
                </div>
                <div className="absolute -right-6 -top-6 bg-white/10 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -left-10 -bottom-10 bg-black/10 w-32 h-32 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-400">
          © 2026 Finflow India. Tracking simplified for INR.
        </p>
      </footer>
    </div>
  );
};

export default Home;
