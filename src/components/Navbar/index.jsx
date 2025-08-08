import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold">HM</div>
          <div className="text-lg font-semibold">HireMe</div>
        </Link>
        <nav className="hidden md:flex gap-6 items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900">Jobs</Link>
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </header>
  );
}
