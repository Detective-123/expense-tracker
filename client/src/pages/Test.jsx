import React, { useState, useMemo, useEffect } from 'react';
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
  Download,
  Sun,
  Moon
} from 'lucide-react';

const App = () => {
  // --- Theme State ---
  const [darkMode, setDarkMode] = useState(false);

  // --- Theme Syncing ---
  // This effect ensures the 'dark' class is applied to the root element, 
  // which is required by Tailwind CSS to trigger 'dark:' variants in many environments.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- App State ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [transactions, setTransactions] = useState([
    { id: 1, text: 'Freelance Project', amount: 45000, category: 'Work', type: 'income', date: '2023-10-01' },
    { id: 2, text: 'Grocery Store', amount: -2400, category: 'Food', type: 'expense', date: '2023-10-02' },
    { id: 3, text: 'Monthly Rent', amount: -15000, category: 'Housing', type: 'expense', date: '2023-10-03' },
    { id: 4, text: 'Investment Dividends', amount: 1200, category: 'Investment', type: 'income', date: '2023-10-04' },
  ]);

  const [formData, setFormData] = useState({
    text: '',
    amount: '',
    category: 'General',
    type: 'expense'
  });

  // --- Derived Calculations ---
  const totals = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
    const balance = income - expense;
    
    return { income, expense, balance };
  }, [transactions]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (!formData.text.trim() || formData.amount === '') return;

    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) return;

    const finalAmount = formData.type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

    const newTransaction = {
      id: Date.now(),
      text: formData.text.trim(),
      amount: finalAmount,
      category: formData.category,
      type: formData.type,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setFormData({ text: '', amount: '', category: 'General', type: 'expense' });
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const exportToCSV = () => {
    if (transactions.length === 0) return;
    const headers = ["Date", "Description", "Category", "Type", "Amount (INR)"];
    const rows = transactions.map(t => [
      t.date,
      `"${t.text.replace(/"/g, '""')}"`,
      t.category,
      t.type,
      t.amount
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `finflow_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Reports', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
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
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActiveTab(item.name)}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.name 
                        ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button 
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center focus:outline-none"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </button>

              <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-none">Alex Rivera</p>
                  <p className="text-[10px] text-slate-500 mt-1">Pro Plan</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold overflow-hidden">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden gap-2">
              <button 
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md text-slate-500 dark:text-slate-400 focus:outline-none"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === item.name 
                      ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-5 h-4 mr-3" />
                  {item.name}
                </button>
              ))}
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
              <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Financial Overview</h1>
              <p className="text-slate-500 dark:text-slate-400">Manage your transactions in INR and track your budget status.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Stats and Table */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col hover:shadow-md transition-all">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg w-fit mb-4">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Balance</span>
                  <span className={`text-2xl font-bold mt-1 ${totals.balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {formatCurrency(totals.balance)}
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col hover:shadow-md transition-all">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-2 rounded-lg w-fit mb-4">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Monthly Income</span>
                  <span className="text-2xl font-bold mt-1 text-emerald-600">
                    {formatCurrency(totals.income)}
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col hover:shadow-md transition-all">
                  <div className="bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 p-2 rounded-lg w-fit mb-4">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Monthly Expenses</span>
                  <span className="text-2xl font-bold mt-1 text-rose-600">
                    {formatCurrency(totals.expense)}
                  </span>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center flex-wrap gap-4">
                  <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-indigo-500" />
                    Transaction History
                  </h2>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={exportToCSV}
                      disabled={transactions.length === 0}
                      className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50 text-slate-700 dark:text-slate-300"
                    >
                      <Download className="w-3 h-3" />
                      Export CSV
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Transaction</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                      {transactions.length > 0 ? (
                        transactions.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600' : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600'}`}>
                                  {t.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                                </div>
                                <span className="font-semibold text-slate-700 dark:text-slate-200">{t.text}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md text-[11px] font-bold uppercase">
                                <Tag className="w-3 h-3" />
                                {t.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                              {t.date}
                            </td>
                            <td className={`px-6 py-4 text-right font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {t.type === 'income' ? '+' : ''}{formatCurrency(t.amount)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                type="button"
                                onClick={() => deleteTransaction(t.id)}
                                className="text-slate-300 dark:text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">
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
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">Quick Entry</h2>
                <form onSubmit={addTransaction} className="space-y-4">
                  
                  {/* Selector Toggle */}
                  <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'expense' })}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                        formData.type === 'expense' 
                          ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-600'
                      }`}
                    >
                      <MinusCircle className="w-4 h-4" />
                      Expense
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'income' })}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                        formData.type === 'income' 
                          ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-600'
                      }`}
                    >
                      <PlusCircle className="w-4 h-4" />
                      Income
                    </button>
                  </div>

                  {/* Input: Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 tracking-wider">Description</label>
                    <input
                      type="text"
                      name="text"
                      required
                      value={formData.text}
                      onChange={handleInputChange}
                      placeholder="e.g., Dinner at Taj"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Input: Amount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 tracking-wider">Amount (₹)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input
                        type="number"
                        name="amount"
                        required
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Input: Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 tracking-wider">Category</label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="General">General</option>
                        <option value="Food">Food & Drink</option>
                        <option value="Housing">Housing</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Investment">Investment</option>
                        <option value="Work">Work/Freelance</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <Tag className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] mt-4 hover:-translate-y-0.5 ${
                      formData.type === 'income' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
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
                    Your savings rate is up <span className="text-white font-bold">12%</span> compared to last month. Keep building your emergency fund!
                  </p>
                  <button type="button" className="text-xs font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm">
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
      <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center transition-colors">
        <p className="text-sm text-slate-400 dark:text-slate-500">© 2023 Finflow India. Tracking simplified for INR.</p>
      </footer>
    </div>
  );
};

export default App;