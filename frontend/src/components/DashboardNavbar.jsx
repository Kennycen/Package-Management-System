import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { Package, Settings, User, LogOut } from "lucide-react";
import { AppContext } from "../context/AppContext";

const DashboardNavbar = () => {
  const { user, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSettings && !event.target.closest('.settings-container')) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  return (
    <div className="flex items-center justify-between py-4">
      <Link className="flex gap-1">
        <Package className="h-7 w-7 mt-1" />
        <h1 className="text-2xl font-bold">PackageDesk</h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <p className="pl-4">Hi, {user?.name}</p>
        <div className="relative settings-container">
          <img
            src={assets.profile_icon}
            className="w-8 drop-shadow cursor-pointer"
            alt=""
            onClick={() => setShowSettings(!showSettings)}
          />
          
          {showSettings && (
            <div className="absolute right-0 top-10 w-28 bg-white rounded-md shadow-lg border z-50">
              <div className="py-1 px-2 font-bold border-b">My Account</div>
              <div className="p-1">
                <button className="w-full text-left px-2 py-1.5 text-sm hover:text-blue-600 flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button className="w-full text-left px-2 py-1.5 text-sm hover:text-blue-600 flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button 
                  onClick={logout}
                  className="w-full text-left px-2 py-1.5 text-sm hover:text-blue-600 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="h-4 w-4"/>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
