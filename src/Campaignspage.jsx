import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell as RechartCell
} from 'recharts';
import { 
  Bell, Settings, Search, Menu, X, TrendingUp, Users, Activity, 
  DollarSign, Calendar, Filter, RefreshCw, Download, MoreHorizontal,
  Plus, ChevronDown, Edit, Trash, Star, Eye, Share2, AlertCircle
} from 'lucide-react';

// Mock campaign data
const campaignData = [
  { 
    id: 1, 
    name: 'Summer Sale Promotion', 
    status: 'Active', 
    type: 'Email', 
    budget: 5000, 
    spent: 2340, 
    impressions: 125000, 
    clicks: 12500, 
    conversions: 750, 
    roi: 3.2,
    startDate: '2025-01-15',
    endDate: '2025-04-15'
  },
  { 
    id: 2, 
    name: 'Product Launch - Alpha Series', 
    status: 'Active', 
    type: 'Social', 
    budget: 12000, 
    spent: 8970, 
    impressions: 350000, 
    clicks: 42000, 
    conversions: 2100, 
    roi: 4.5,
    startDate: '2025-02-01',
    endDate: '2025-05-01'
  },
  { 
    id: 3, 
    name: 'Retargeting Campaign', 
    status: 'Active', 
    type: 'Display', 
    budget: 3500, 
    spent: 3200, 
    impressions: 95000, 
    clicks: 7800, 
    conversions: 390, 
    roi: 2.8,
    startDate: '2025-01-01',
    endDate: '2025-03-31'
  },
  { 
    id: 4, 
    name: 'Holiday Special', 
    status: 'Scheduled', 
    type: 'Email', 
    budget: 4500, 
    spent: 0, 
    impressions: 0, 
    clicks: 0, 
    conversions: 0, 
    roi: 0,
    startDate: '2025-04-01',
    endDate: '2025-04-30'
  },
  { 
    id: 5, 
    name: 'Brand Awareness', 
    status: 'Paused', 
    type: 'Video', 
    budget: 7500, 
    spent: 4200, 
    impressions: 180000, 
    clicks: 22000, 
    conversions: 850, 
    roi: 3.7,
    startDate: '2025-01-10',
    endDate: '2025-04-10'
  },
  { 
    id: 6, 
    name: 'Loyalty Program Promotion', 
    status: 'Active', 
    type: 'Email', 
    budget: 2800, 
    spent: 1650, 
    impressions: 75000, 
    clicks: 9200, 
    conversions: 620, 
    roi: 5.2,
    startDate: '2025-02-15',
    endDate: '2025-03-15'
  },
  { 
    id: 7, 
    name: 'Search Engine Marketing', 
    status: 'Active', 
    type: 'Search', 
    budget: 8500, 
    spent: 6700, 
    impressions: 210000, 
    clicks: 28500, 
    conversions: 1250, 
    roi: 4.1,
    startDate: '2025-01-01',
    endDate: '2025-06-30'
  }
];

// Campaign performance trend data
const performanceTrendData = [
  { day: 'Mon', impressions: 15000, clicks: 1200, conversions: 80 },
  { day: 'Tue', impressions: 17000, clicks: 1400, conversions: 95 },
  { day: 'Wed', impressions: 18500, clicks: 1550, conversions: 105 },
  { day: 'Thu', impressions: 22000, clicks: 1900, conversions: 140 },
  { day: 'Fri', impressions: 24000, clicks: 2100, conversions: 155 },
  { day: 'Sat', impressions: 16000, clicks: 1300, conversions: 90 },
  { day: 'Sun', impressions: 14000, clicks: 1100, conversions: 75 },
];

// Campaign type distribution
const campaignTypeData = [
  { name: 'Email', value: 3 },
  { name: 'Social', value: 1 },
  { name: 'Display', value: 1 },
  { name: 'Video', value: 1 },
  { name: 'Search', value: 1 },
];

// Pie chart colors
const COLORS = ['#4f46e5', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

const CampaignsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // Handle search input key press (reload on Enter)
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      window.location.reload();
    }
  };

  // Filter campaigns based on selected status
  const filteredCampaigns = selectedStatus === 'All'
    ? campaignData
    : campaignData.filter(campaign => campaign.status === selectedStatus);

  // Sort campaigns with safe comparison
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    const valueA = a[sortBy] ?? '';
    const valueB = b[sortBy] ?? '';
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Paused':
        return 'bg-amber-100 text-amber-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            <h2 className="text-xl font-semibold text-gray-800">Campaign Management</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
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

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Page Header with Action Buttons */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Marketing Campaigns</h1>
              <p className="text-gray-500 mt-1">Manage and track your active marketing initiatives</p>
            </div>
            <div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
                <Plus size={16} className="mr-2" /> Create Campaign
              </button>
            </div>
          </div>

          {/* Filters and Status Toggle */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedStatus('All')} 
                className={`px-3 py-1.5 text-sm rounded-lg ${selectedStatus === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
              >
                All Campaigns
              </button>
              <button 
                onClick={() => setSelectedStatus('Active')} 
                className={`px-3 py-1.5 text-sm rounded-lg ${selectedStatus === 'Active' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
              >
                Active
              </button>
              <button 
                onClick={() => setSelectedStatus('Paused')} 
                className={`px-3 py-1.5 text-sm rounded-lg ${selectedStatus === 'Paused' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700'}`}
              >
                Paused
              </button>
              <button 
                onClick={() => setSelectedStatus('Scheduled')} 
                className={`px-3 py-1.5 text-sm rounded-lg ${selectedStatus === 'Scheduled' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              >
                Scheduled
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

          {/* Campaign Performance Overview */}
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Campaign Performance (7-Day Trend)</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="impressions" stroke="#a5b4fc" strokeWidth={2} />
                  <Line type="monotone" dataKey="clicks" stroke="#4f46e5" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="#312e81" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Campaign Distribution</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={campaignTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {campaignTypeData.map((entry, index) => (
                      <RechartCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">All Campaigns ({filteredCampaigns.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Campaign Name
                        {sortBy === 'name' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        {sortBy === 'status' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center">
                        Type
                        {sortBy === 'type' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('budget')}
                    >
                      <div className="flex items-center">
                        Budget
                        {sortBy === 'budget' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('roi')}
                    >
                      <div className="flex items-center">
                        ROI
                        {sortBy === 'roi' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">{campaign.startDate} to {campaign.endDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${campaign.budget.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          ${campaign.spent.toLocaleString()} spent ({Math.round(campaign.spent / campaign.budget * 100)}%)
                        </div>
                        {campaign.status !== 'Scheduled' && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-indigo-600 h-1.5 rounded-full" 
                              style={{ width: `${Math.min(Math.round(campaign.spent / campaign.budget * 100), 100)}%` }}
                            ></div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {campaign.status !== 'Scheduled' ? (
                          <div className={`text-sm font-medium ${campaign.roi >= 3 ? 'text-green-600' : campaign.roi >= 1 ? 'text-amber-600' : 'text-red-600'}`}>
                            {campaign.roi}x
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Eye size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-red-600">
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredCampaigns.length}</span> of <span className="font-medium">{filteredCampaigns.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Campaign Recommendations */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-2">
                  <AlertCircle size={16} />
                </div>
                <h3 className="font-semibold text-gray-800">AI-Generated Campaign Recommendations</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Star size={14} className="text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Increase budget for "Product Launch - Alpha Series"</p>
                    <p className="text-sm text-gray-500 mt-1">This campaign is performing 42% above average with 4.5x ROI. Consider increasing budget by $3,000 to maximize returns.</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-xs text-gray-500">Potential impact: High</div>
                      <button className="text-xs text-indigo-600 font-medium">Apply Recommendation</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertCircle size={14} className="text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Update creative for "Summer Sale Promotion"</p>
                    <p className="text-sm text-gray-500 mt-1">Click-through rate has decreased by 12% in the past week. Creative refresh recommended to prevent ad fatigue.</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-xs text-gray-500">Potential impact: Medium</div>
                      <button className="text-xs text-indigo-600 font-medium">Apply Recommendation</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Share2 size={14} className="text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Expand "Loyalty Program Promotion" to additional channels</p>
                    <p className="text-sm text-gray-500 mt-1">This email campaign shows strong conversion rates of 5.2x ROI. Test expanding to social media to reach wider audience.</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-xs text-gray-500">Potential impact: Medium</div>
                      <button className="text-xs text-indigo-600 font-medium">Apply Recommendation</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle size={14} className="text-red-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Revisit targeting for "Brand Awareness" campaign</p>
                    <p className="text-sm text-gray-500 mt-1">Currently paused due to declining performance. Analysis suggests audience overlap with other campaigns causing ad fatigue.</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-xs text-gray-500">Potential impact: High</div>
                      <button className="text-xs text-indigo-600 font-medium">Apply Recommendation</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-indigo-600 font-medium text-sm hover:text-indigo-800">
                View All Recommendations
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CampaignsPage;