import React, { useEffect, useState } from 'react';
import { 
  User, 
  Mail, 
  Camera, 
  ArrowLeft, 
  LogOut, 
  Key,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import toast from 'react-hot-toast';

import { getUser, logout } from '../services/authServices.js';
import { useNavigate } from 'react-router-dom';

/**
 * ProfileSettings Component (Simplified)
 * Features basic profile management fields in a clean, single-column layout.
 */
const ProfileSettings = ({ onBack, onLogout }) => {
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const initialUserData = {
    username: "",
    fullname: "",
    email: ""
  };

  const [profile, setProfile] = useState(initialUserData);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if(user) {  
          setProfile(user.data.user);
        }
        console.log(user.data.user);
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to get user")
      }
    }

    fetchUser();
  }, [])

  const userLogout = async () => {
    console.log("Logout clicked")
    try {
      const res = await logout();
      console.log(res);
      toast.success("User logged out successfully!")
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to logout")
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="h-screen w-full bg-slate-100 flex flex-col justify-center items-center p-4 font-sans overflow-hidden">
      <div className="w-full max-w-md h-auto max-h-[90vh] flex flex-col">
        
        {/* Header with Back Button */}
        <div className="mb-6 text-center relative">
            <button 
                onClick={() => navigate("/home")}
                className="absolute left-0 top-1 p-2 bg-white rounded-full shadow-sm text-slate-500 hover:text-indigo-600 transition-colors"
            >
                <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Profile</h2>
        </div>

        {/* Main Settings Card */}
        <div className="bg-white shadow-[0_20px_50px_rgba(8,112,184,0.1)] rounded-3xl border-2 border-slate-200 overflow-hidden flex flex-col">
            
            <div className="overflow-y-auto p-6 scrollbar-hide">
                <form onSubmit={handleSave} className="space-y-6">
                    
                    {/* Profile Picture (Visual Only) */}
                    <div className="flex flex-col items-center">
                        <div className="relative group cursor-pointer">
                            <div className="h-24 w-24 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg shadow-indigo-100">
                                <div className="h-full w-full rounded-full bg-white p-0.5">
                                    <img 
                                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=Brooklynn" 
                                        alt="Profile" 
                                        className="rounded-full bg-slate-100 h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white border-2 border-white shadow-sm hover:scale-105 transition-transform">
                                <Camera className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="mt-3 text-sm font-bold text-slate-400">@{profile?.username}</p>
                    </div>

                    {/* Basic Info Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={profile?.fullname}
                                    onChange={(e) => setProfile({...profile, fullname: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors font-medium text-slate-700 bg-slate-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Username</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">@</span>
                                <input
                                    type="text"
                                    value={profile?.username}
                                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                                    className="w-full pl-8 pr-4 py-2 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors font-medium text-slate-700 bg-slate-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={profile?.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors font-medium text-slate-700 bg-slate-50 focus:bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Change Password Section (Collapsible) */}
                    <div className="border-t border-slate-100 pt-4">
                        <button 
                            type="button"
                            onClick={() => setShowPasswordSection(!showPasswordSection)}
                            className="w-full flex items-center justify-between text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors px-1"
                        >
                            <span className="flex items-center"><Key className="h-4 w-4 mr-2" /> Change Password</span>
                            {showPasswordSection ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        
                        {showPasswordSection && (
                            <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
                                <input 
                                    type="password" 
                                    placeholder="Current Password" 
                                    className="w-full px-4 py-2 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-slate-50 focus:bg-white" 
                                />
                                <input 
                                    type="password" 
                                    placeholder="New Password" 
                                    className="w-full px-4 py-2 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-slate-50 focus:bg-white" 
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2 space-y-3">
                        <button 
                            type="submit"
                            className="w-full flex justify-center items-center py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
                        >
                            {isSaved ? 'Changes Saved!' : 'Save Changes'}
                        </button>
                        
                        <button 
                            type="button"
                            onClick={userLogout}
                            className="w-full flex justify-center items-center py-3 bg-red-50 text-red-500 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Log Out
                        </button>
                    </div>

                </form>
            </div>
        </div>
        
        <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Member since 2024
        </p>
      </div>
    </div>
  );
};

export default ProfileSettings;