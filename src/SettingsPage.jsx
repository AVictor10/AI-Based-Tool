import React, { useState } from 'react';
import { Bell, Search, Menu, X, TrendingUp, Users, Activity, DollarSign, Settings, Save } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userSettings, setUserSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    notifications: true,
    theme: 'light',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', userSettings);
    // Add API call or logic to save settings
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-indigo-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold text-xl transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>MarketAI</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-1 rounded hover:bg-indigo-700">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-8">
          <NavLink to="/" className={({ isActive }) => `px-4 py-3 flex items-center cursor-pointer hover:bg-indigo-700 ${isActive ? 'bg-indigo-700' : ''}`}>
            <TrendingUp size={20} />
            <span className={`ml-4 transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Dashboard</span>
          </NavLink>
          <NavLink to="/campaigns" className={({ isActive }) => `px-4 py-3 flex items-center cursor-pointer hover:bg-indigo-700 ${isActive ? 'bg-indigo-700' : ''}`}>
            <Activity size={20} />
            <span className={`ml-4 transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Campaigns</span>
          </NavLink>
          <NavLink to="/audience" className={({ isActive }) => `px-4 py-3 flex items-center cursor-pointer hover:bg-indigo-700 ${isActive ? 'bg-indigo-700' : ''}`}>
            <Users size={20} />
            <span className={`ml-4 transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Audience</span>
          </NavLink>
          <NavLink to="/revenue" className={({ isActive }) => `px-4 py-3 flex items-center cursor-pointer hover:bg-indigo-700 ${isActive ? 'bg-indigo-700' : ''}`}>
            <DollarSign size={20} />
            <span className={`ml-4 transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Revenue</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `px-4 py-3 flex items-center cursor-pointer hover:bg-indigo-700 ${isActive ? 'bg-indigo-700' : ''}`}>
            <Settings size={20} />
            <span className={`ml-4 transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={handleKeyPress}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Settings</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userSettings.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userSettings.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Theme</label>
                  <select
                    name="theme"
                    value={userSettings.theme}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={userSettings.notifications}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-700">Enable Notifications</label>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Save size={16} className="mr-2" /> Save Settings
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;