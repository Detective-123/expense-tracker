import React from 'react';
import { 
  ArrowRight, 
  PieChart, 
  Shield, 
  Zap, 
  BarChart3, 
  Smartphone, 
  Wallet,
  CheckCircle2,
  Github,
  Twitter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * LandingPage Component
 * The default "/" startup page for the Expense Tracker app.
 * * @param {Function} onLogin - Callback to navigate to the Login page
 * @param {Function} onRegister - Callback to navigate to the Register page
 */
const LandingPage = ({ onLogin, onRegister }) => {
  // to go on other pages
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500/30">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Broke<span className="text-indigo-600">Buddy</span>
              </span>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => navigate("/login")}
                className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={() => navigate("/register")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2 px-5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-48 -left-24 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8">
            <Zap className="h-3.5 w-3.5" />
            <span>Now with AI Receipt Scanning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 max-w-4xl mx-auto leading-tight">
            Take absolute control of your <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-500">financial future.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Track expenses, analyze spending habits, and build wealth with the most intuitive personal finance dashboard designed for modern humans.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-4 px-8 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1 active:scale-95"
            >
              Start for free
              <ArrowRight className="h-5 w-5" />
            </button>
            <button 
            onClick={() => navigate("/comingsoon")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 text-lg font-bold py-4 px-8 rounded-2xl transition-all hover:-translate-y-1 active:scale-95">
              View live demo
            </button>
          </div>
          
          <p className="mt-6 text-sm text-slate-500 font-medium">
            No payment required free forever plan
          </p>
        </div>
      </section>

      {/* App Interface Mockup */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="relative rounded-[2.5rem] bg-slate-900 p-4 md:p-8 shadow-2xl overflow-hidden border border-slate-800 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          {/* Mockup Header */}
          <div className="flex items-center gap-2 mb-6 px-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          
          {/* Mockup Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 space-y-6">
              {/* Chart Mockup */}
              <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50 h-64 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Total Balance</p>
                    <h3 className="text-3xl font-black text-white mt-1">$12,450.00</h3>
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                    +14.5%
                  </div>
                </div>
                {/* Fake Chart Bars */}
                <div className="flex items-end gap-2 h-32 pt-6">
                  {[40, 70, 45, 90, 65, 85, 100, 60].map((height, i) => (
                    <div key={i} className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/40 transition-colors rounded-t-md relative group" style={{ height: `${height}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ${height * 10}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions Mockup */}
              <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50">
                <h4 className="text-white font-bold mb-4">Recent Transactions</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Apple Store', cat: 'Electronics', amount: '-$99.00', color: 'bg-slate-700' },
                    { name: 'Whole Foods', cat: 'Groceries', amount: '-$145.20', color: 'bg-emerald-500/20 text-emerald-400' },
                    { name: 'Upwork Escrow', cat: 'Income', amount: '+$1,200.00', color: 'bg-indigo-500/20 text-indigo-400' }
                  ].map((tx, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${tx.color} flex items-center justify-center border border-slate-600/50`} />
                        <div>
                          <p className="text-white text-sm font-bold">{tx.name}</p>
                          <p className="text-slate-500 text-xs">{tx.cat}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Widget Mockup */}
            <div className="space-y-6">
              <div className="bg-indigo-600 rounded-3xl p-6 shadow-lg shadow-indigo-900/50">
                <PieChart className="h-8 w-8 text-indigo-200 mb-4" />
                <h4 className="text-white font-bold text-lg leading-tight mb-2">Monthly Budget Limit</h4>
                <p className="text-indigo-200 text-sm mb-6">You've used 80% of your budget for this month.</p>
                <div className="w-full bg-indigo-900/50 rounded-full h-2 mb-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50 flex flex-col justify-center items-center text-center h-48 border-dashed">
                <div className="bg-slate-700/50 p-3 rounded-full mb-3">
                  <PieChart className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-white font-bold text-sm">Add New Widget</p>
                <p className="text-slate-500 text-xs mt-1">Customize your view</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Everything you need to manage your money
            </h2>
            <p className="text-slate-600 text-lg">
              Powerful features packed into a beautifully simple interface. No accounting degree required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-6 w-6 text-indigo-600" />,
                title: "Advanced Analytics",
                desc: "Visualize your spending patterns with beautiful, interactive charts that help you identify where your money goes."
              },
              {
                icon: <Smartphone className="h-6 w-6 text-indigo-600" />,
                title: "Cross-Platform Sync",
                desc: "Access your financial data anywhere. Our web and mobile apps sync instantly in the cloud."
              },
              {
                icon: <Shield className="h-6 w-6 text-indigo-600" />,
                title: "Bank-Grade Security",
                desc: "Your data is encrypted using AES-256. We never sell your data to third parties, ever."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 rounded-4xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-white w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/2" />
            
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 relative z-10">
              Ready to fix your finances?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
              Join over 10,000 users who are already saving more, stressing less, and taking control of their money.
            </p>
            
            <button 
              onClick={() => navigate("/register")}
              className="relative z-10 bg-indigo-500 hover:bg-indigo-400 text-white text-lg font-bold py-4 px-10 rounded-2xl shadow-xl shadow-indigo-900/50 transition-all active:scale-95"
            >
              Create Your Free Account
            </button>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
              {['Free forever plan', 'No credit card', 'Cancel anytime'].map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-indigo-600" />
            <span className="text-lg font-black tracking-tight text-slate-900">
              Broke<span className="text-indigo-600">Buddy</span>
            </span>
          </div>
          
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact Support</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;