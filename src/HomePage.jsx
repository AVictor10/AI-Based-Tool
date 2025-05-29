import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-600 text-center p-4">Error loading homepage. Please refresh.</div>;
    }
    return this.props.children;
  }
}

const HomePage = () => {
  console.log('HomePage rendered'); // Debug log
  return (
    <ErrorBoundary>
      <div className="bg-gray-100 min-h-screen font-sans">
        {/* Navbar */}
        <nav className="bg-indigo-800 text-white p-4 sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">MarketAI</h1>
            <div className="space-x-4">
              <NavLink to="/home" className={({ isActive }) => `hover:text-indigo-200 ${isActive ? 'text-indigo-200' : ''}`}>Home</NavLink>
              <NavLink to="/" className={({ isActive }) => `hover:text-indigo-200 ${isActive ? 'text-indigo-200' : ''}`}>Dashboard</NavLink>
              <NavLink to="/campaigns" className={({ isActive }) => `hover:text-indigo-200 ${isActive ? 'text-indigo-200' : ''}`}>Campaigns</NavLink>
              <NavLink to="/audience" className={({ isActive }) => `hover:text-indigo-200 ${isActive ? 'text-indigo-200' : ''}`}>Audience</NavLink>
              <NavLink to="/revenue" className={({ isActive }) => `hover:text-indigo-200 ${isActive ? 'text-indigo-200' : ''}`}>Revenue</NavLink>
              <NavLink to="/settings" className={({ isActive }) => `hover:text-indigo-200 ${isActive ? 'text-indigo-200' : ''}`}>Settings</NavLink>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-indigo-600 text-white py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">MarketAI: AI-Driven Marketing</h2>
            <p className="text-lg mb-6">Optimize campaigns, analyze audiences, and track revenue with AI.</p>
            <NavLink to="/" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-100">Go to Dashboard</NavLink>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-indigo-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>© 2025 MarketAI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default HomePage;