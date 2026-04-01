import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ArrowLeft, 
  Receipt,
  Search,
  Wallet,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Handle "Go Back" logic
  const handleGoBack = () => {
    window.history.back();
  };

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8 font-sans text-slate-900">
      {/* Brand Header */}
      <div className="absolute top-8 left-8 flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
          <Wallet className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">FinFlow</span>
      </div>

      <main className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Visual Illustration */}
        <div className="relative flex justify-center items-center">
          {/* Background Decoration */}
          <div className="absolute w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          
          <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 transform hover:rotate-1 transition-transform duration-500">
            <div className="flex flex-col items-center space-y-6">
              {/* Animated Icon */}
              <div className="relative">
                <Receipt className="w-32 h-32 text-slate-200" strokeWidth={1} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-red-500 animate-bounce" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h1 className="text-7xl font-black text-slate-800 tracking-tighter">404</h1>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Error: Unreconciled Path</p>
              </div>

              {/* Decorative "Receipt" Details */}
              <div className="w-full border-t border-dashed border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                  <span>Transaction ID:</span>
                  <span>#LOST-PAGE-99</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                  <span>Category:</span>
                  <span>Misplaced Data</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-600 font-mono uppercase pt-2 border-t border-slate-50 mt-2 italic">
                  <span>Total Loss:</span>
                  <span>$0.00 (Not Found)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content & Navigation */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
              Looks like this transaction <span className="text-blue-600">didn't clear.</span>
            </h2>
            <p className="text-lg text-slate-600">
              The page you are looking for has been moved or deleted from your ledger. Let's get your finances back on track.
            </p>
          </div>

          {/* Primary Action */}
          <div className="flex flex-col space-y-4">
            <a 
              href="#"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`flex items-center p-5 rounded-2xl border transition-all duration-300 ${
                isHovered 
                ? 'bg-white border-blue-200 shadow-xl translate-x-2' 
                : 'bg-white border-slate-200'
              }`}
              onClick={() => navigate("/home")}
            >
              <div className={`p-3 rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                <Home className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-bold text-slate-800">Return to Dashboard</h3>
                <p className="text-sm text-slate-500">Check your current balance and activity</p>
              </div>
            </a>

            <div className="relative flex items-center py-2">
              <div className="grow border-t border-slate-200"></div>
              <span className="shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">or search ledger</span>
              <div className="grow border-t border-slate-200"></div>
            </div>

            {/* Search Fallback */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for transactions or settings..."
                className="block w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm group-hover:shadow-md"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>

          <button 
            onClick={handleGoBack}
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Go back to previous statement
          </button>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        FinFlow Ledger System • Error Log 404
      </footer>
    </div>
  );
};

export default NotFound;