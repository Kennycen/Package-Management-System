import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Menu, X } from "lucide-react";
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const {user, setShowLogin} = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-4">
        <Link to="/" className="flex gap-1">
          <Package className="h-7 w-7 mt-1" />
          <h1 className="text-2xl font-bold">PackageDesk</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <p className="max-sm:hidden pl-4">Hi, {user.name}</p>
              <div className="relative group">
                <img
                  src={assets.profile_icon}
                  className="w-8 drop-shadow cursor-pointer"
                  alt=""
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-3 bg-white rounded-md border text-sm">
                    <li className="py-1 px-2 cursor-pointer">
                      Profile
                    </li>
                    <li className="py-1 px-2 cursor-pointer border-b border-black">
                      Setting
                    </li>
                    <li onClick={logout} className="py-1 px-2 cursor-pointer">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('feature')}
                className="cursor-pointer hover:text-gray-600"
              >
                Feature
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="cursor-pointer hover:text-gray-600"
              >
                About
              </button>
              <button onClick={()=>setShowLogin(true)} className="rounded-md py-2 px-4 bg-black text-white cursor-pointer hover:bg-gray-800">
                Login
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center pt-20 space-y-4">
          <button 
            onClick={() => scrollToSection('feature')}
            className="w-full text-center py-2 hover:bg-gray-100"
          >
            Feature
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="w-full text-center py-2 hover:bg-gray-100"
          >
            About
          </button>
          <button onClick={()=>setShowLogin(true)} className="w-[80%] rounded-md py-2 px-4 bg-black text-white cursor-pointer hover:bg-gray-800">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar