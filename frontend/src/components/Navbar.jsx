import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Menu, X } from "lucide-react";
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const {setShowLogin} = useContext(AppContext);
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
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("feature")}
              className="cursor-pointer hover:text-gray-600 font-semibold"
            >
              Feature
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="cursor-pointer hover:text-gray-600 font-semibold"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className="cursor-pointer hover:text-gray-600 font-semibold"
            >
              Demo
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="rounded-md py-2 px-4 bg-red-500/90 text-white cursor-pointer hover:bg-red-700 transition-colors font-semibold"
            >
              Login
            </button>
          </div>
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
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center pt-20 space-y-4">
          <button
            onClick={() => scrollToSection("feature")}
            className="w-full text-center py-2 hover:bg-gray-100 cursor-pointer"
          >
            Feature
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="w-full text-center py-2 hover:bg-gray-100 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("demo")}
            className="w-full text-center py-2 hover:bg-gray-100 cursor-pointer"
          >
            Demo
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="w-[80%] rounded-md py-2 px-4 bg-black text-white cursor-pointer hover:bg-gray-800"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar