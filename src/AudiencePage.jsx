import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell as RechartCell } from 'recharts';
import { Bell, Search, Menu, X, TrendingUp, Users, Activity, DollarSign, Settings, Calendar, Filter, RefreshCw, Download, MoreHorizontal } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Mock data
const engagementData = [
  { name: 'Email', engagement: 65, retention: 45 },
  { name: 'Social', engagement: 80, retention: 60 },
  { name: 'Search', engagement: 50, retention: 30 },
  { name: 'Display', engagement: 40, retention: 25 },
  { name: 'Video', engagement: 75, retention: 55 },
];

const audienceDemographics = [
  { name: '18-24', value: 20 },
  { name: '25-34', value: 35 },
  { name: '35-44', value: 25 },
  { name: '45-54', value: 15 },
  { name: '55+', value: 5 },
];

const COLORS = ['#4f46e5', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

const Audience = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
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
            <h2 className="text-xl font-semibold text-gray-800">Audience Analytics</h2>
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
          {/* Filters */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTimeframe('7d')}
                className={`px-3 py-1.5 text-sm rounded-lg ${selectedTimeframe === '7d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
              >
                7 Days
              </button>
              <button
                onClick={() => setSelectedTimeframe('30d')}
                className={`px-3 py-1.5 text-sm rounded-lg ${selectedTimeframe === '30d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
              >
                30 Days
              </button>
              <button
                onClick={() => setSelectedTimeframe('90d')}
                className={`px-3 py-1.5 text-sm rounded-lg ${selectedTimeframe === '90d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
              >
                90 Days
              </button>
              <button
                onClick={() => setSelectedTimeframe('ytd')}
                className={`px-3 py-1.5 text-sm rounded-lg ${selectedTimeframe === 'ytd' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
              >
                Year to Date
              </button>
              <button
                onClick={() => setSelectedTimeframe('custom')}
                className={`px-3 py-1.5 text-sm rounded-lg ${selectedTimeframe === 'custom' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} flex items-center`}
              >
                <Calendar size={14} className="mr-1" /> Custom
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={refreshData}
                className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-lg flex items-center"
              >
                <RefreshCw size={14} className={`mr-1 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
              <button className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-lg flex items-center">
                <Filter size={14} className="mr-1" /> Filter
              </button>
              <button className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-lg flex items-center">
                <Download size={14} className="mr-1" /> Export
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Audience</p>
                  <h3 className="text-2xl font-bold mt-1">128,450</h3>
                </div>
                <div className="p-2 bg-green-100 text-green-800 rounded-lg flex items-center text-sm font-medium">
                  <TrendingUp size={14} className="mr-1" /> +15.2%
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">vs previous period</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Engagement Rate</p>
                  <h3 className="text-2xl font-bold mt-1">62.3%</h3>
                </div>
                <div className="p-2 bg-green-100 text-green-800 rounded-lg flex items-center text-sm font-medium">
                  <TrendingUp size={14} className="mr-1" /> +8.1%
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">vs previous period</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Retention Rate</p>
                  <h3 className="text-2xl font-bold mt-1">45.7%</h3>
                </div>
                <div className="p-2 bg-red-100 text-red-800 rounded-lg flex items-center text-sm font-medium">
                  <TrendingUp size={14} className="mr-1 transform rotate-180" /> -3.4%
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">vs previous period</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">New Users</p>
                  <h3 className="text-2xl font-bold mt-1">12,340</h3>
                </div>
                <div className="p-2 bg-green-100 text-green-800 rounded-lg flex items-center text-sm font-medium">
                  <TrendingUp size={14} className="mr-1" /> +22.6%
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">vs previous period</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Audience Demographics</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={audienceDemographics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {audienceDemographics.map((entry, index) => (
                      <RechartCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Engagement by Channel</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagement" fill="#4f46e5" />
                  <Bar dataKey="retention" fill="#818cf8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Audience;