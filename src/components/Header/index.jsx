import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-teal-400 text-white rounded-2xl p-8 md:p-16 mb-8">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">Your ideal job awaits — start the search</h1>
        <p className="text-lg md:text-xl mb-6">Get the latest job openings that best suit you.</p>
        <div className="flex justify-center gap-4">
          <Link to="#jobs" className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold">Browse Jobs</Link>
          <a href="#about" className="px-6 py-3 border border-white rounded-lg text-white">Learn More</a>
        </div>
      </div>
    </section>
  );
}
