import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { Package, Settings, User } from "lucide-react";
import { AppContext } from "../context/AppContext";

const DashNavbar = () => {
  const { user, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between py-4">
      <Link className="flex gap-1">
        <Package className="h-7 w-7 mt-1" />
        <h1 className="text-2xl font-bold">PackageDesk</h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <p className="max-sm:hidden pl-4">Hi, {user?.name}</p>
        <div className="relative group">
          <img
            src={assets.profile_icon}
            className="w-8 drop-shadow cursor-pointer"
            alt=""
          />
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
            <ul className="list-none m-0 p-3 bg-white rounded-md border text-sm">
              <li className="py-1 px-2 font-bold w-20">Account</li>
              <li className="py-1 px-2 cursor-pointer hover:text-blue-600">Profile</li>
              <li className="py-1 px-2 cursor-pointer border-b border-black hover:text-blue-600">
                Setting
              </li>
              <li onClick={logout} className="py-1 px-2 cursor-pointer hover:text-blue-600">
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
