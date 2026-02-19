import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  ArrowLeft, 
  BellRing, 
  ShieldCheck,
  Rocket,
  ArrowRight
} from 'lucide-react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotify = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-violet-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10" />

      {/* Navigation Layer */}
      <nav className="p-6 md:p-8">
        <button 
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
        >
          <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Dashboard
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
        
        {/* Animated Icon Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200/50 transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <Rocket className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
          
          {/* Floating Accents */}
          <div className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-lg border border-slate-50 animate-bounce duration-3000">
            <Clock className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="absolute -bottom-2 -left-6 bg-emerald-500 p-2 rounded-xl shadow-lg border-2 border-white animate-pulse">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Textual Content */}
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm shadow-indigo-100/50">
            Under Construction
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
            This Feature is <br /> 
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600">
              Coming Soon!
            </span>
          </h1>
          
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 px-4">
            Our engineers are working hard to bring this feature to life. 
            We prioritize quality and security, so it's taking a little extra 
            time to perfect. We can't wait to show you what's next.
          </p>

          {/* Action Area / Newsletter */}
          {!isSubscribed ? (
            <form onSubmit={handleNotify} className="relative max-w-md mx-auto group">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access" 
                className="w-full pl-6 pr-40 py-5 bg-white border border-slate-200 rounded-4xl shadow-xl shadow-slate-200/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 text-white rounded-3xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200/50 active:scale-95"
              >
                Notify Me
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="bg-emerald-50 text-emerald-700 py-5 px-8 rounded-4xl border border-emerald-100 font-bold animate-in zoom-in duration-300">
              ✓ We'll notify you as soon as we launch!
            </div>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
            <ShieldCheck className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Finflow Advanced Protection
            </span>
          </div>
          <p className="text-slate-400 text-xs font-medium">
            © 2026 Finflow Technologies Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
