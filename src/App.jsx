import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell as RechartCell,
} from "recharts";
import {
  Bell,
  Settings,
  Search,
  Menu,
  X,
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  Calendar,
  Filter,
  RefreshCw,
  Download,
  MoreHorizontal,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// Pie chart colors
const COLORS = ["#4f46e5", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

const App = () => {
  const [campaignPerformanceData, setCampaignPerformanceData] = useState([
    { name: "Email", impressions: 4000, clicks: 2400, conversions: 1200 },
    { name: "Social", impressions: 3000, clicks: 1398, conversions: 900 },
    { name: "Search", impressions: 2000, clicks: 980, conversions: 500 },
    { name: "Display", impressions: 2780, clicks: 908, conversions: 300 },
    { name: "Video", impressions: 1890, clicks: 1800, conversions: 810 },
  ]);
  const [revenueData, setRevenueData] = useState([
    { name: "Jan", revenue: 4000, forecast: 4200 },
    { name: "Feb", revenue: 3000, forecast: 3500 },
    { name: "Mar", revenue: 5000, forecast: 4800 },
    { name: "Apr", revenue: 6000, forecast: 5800 },
    { name: "May", revenue: 8000, forecast: 7500 },
    { name: "Jun", revenue: 7500, forecast: 8000 },
    { name: "Jul", revenue: 9000, forecast: 8800 },
  ]);
  const [audienceData, setAudienceData] = useState([
    { name: "18-24", value: 20 },
    { name: "25-34", value: 35 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 15 },
    { name: "55+", value: 5 },
  ]);
  const [channelConversions, setChannelConversions] = useState([
    { name: "Jan", organic: 4000, paid: 2400 },
    { name: "Feb", organic: 3000, paid: 1398 },
    { name: "Mar", organic: 2000, paid: 5800 },
    { name: "Apr", organic: 2780, paid: 3908 },
    { name: "May", organic: 1890, paid: 4800 },
    { name: "Jun", organic: 2390, paid: 3800 },
    { name: "Jul", organic: 3490, paid: 4300 },
  ]);
  const [aiInsights, setAiInsights] = useState([
    "Audience engagement spikes 27% when posting between 2-4pm on Thursdays",
    "Email campaigns with personalized subject lines seeing 38% higher open rates",
    "Video content featuring product demonstrations drives 52% more conversions than testimonials",
    "Potential ad fatigue detected in 'Summer Sale' campaign - consider refreshing creative",
    "Cross-channel attribution shows social media influences 42% of direct search conversions",
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);
  // Loading text sequence
  const loadingMessages = [
    "Analyzing market data...",
    "Processing campaign metrics...",
    "Generating AI insights...",
    "Optimizing performance data...",
    "Finalizing results...",
  ];
  // Full-screen loader component (add this to your JSX)
  const FullScreenLoader = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      {/* Main loader content */}
      <div className="text-center z-10">
        {/* Spinning loader */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-white mx-auto"></div>
          <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-400 absolute top-2 left-1/2 transform -translate-x-1/2 animate-reverse-spin"></div>
          <div className="w-12 h-12 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-400 absolute top-4 left-1/2 transform -translate-x-1/2"></div>
        </div>
        {/* Loading text */}
        <div className="text-white text-xl font-semibold mb-4 min-h-[2rem] flex items-center justify-center">
          <span className="animate-pulse">{loadingText}</span>
        </div>
        {/* Progress dots */}
        <div className="flex space-x-2 justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Complete Gemini API function
  const getGeminiResponse = async (keyword, dataFormat) => {
    const api_key = "AIzaSyBFnGL7F5veSvkmfIv6IZp7DwHDNT4GB3k"; // Replace with your actual API key
    const api_url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    const prompt = `
Generate marketing analytics data for "${keyword}" campaign/industry in the following JSON format. Provide realistic values for digital marketing channels:

1. Campaign Performance Data (array of objects):
   - Each object should have: name (channel name), impressions (number 1000-10000), clicks (number 500-5000), conversions (number 100-2000)
   - Include channels like: Email, Social, Search, Display, Video, Mobile, Influencer, Podcast, etc.
   - Make values realistic for each channel type

2. Revenue Data (array of objects):
   - Monthly data with: name (month), revenue (number 2000-10000), forecast (number 2000-12000)
   - Include 7 months: Jan, Feb, Mar, Apr, May, Jun, Jul

3. Audience Demographics (array of objects):
   - Each object should have: name (age range), value (percentage of total audience)
   - Age ranges: 18-24, 25-34, 35-44, 45-54, 55+
   - Values should add up to 100

4. Channel Conversions (array of objects):
   - Monthly data with: name (month), organic (number 1000-5000), paid (number 1000-6000)
   - Include 7 months: Jan, Feb, Mar, Apr, May, Jun, Jul

5. AI Insights (array of strings):
   - 5 marketing insights related to "${keyword}"
   - Make them specific and actionable

Return only valid JSON with this structure:
{
  "campaignPerformanceData": [
    { "name": "Email", "impressions": 4000, "clicks": 2400, "conversions": 1200 }
  ],
  "revenueData": [
    { "name": "Jan", "revenue": 4000, "forecast": 4200 }
  ],
  "audienceData": [
    { "name": "18-24", "value": 20 }
  ],
  "channelConversions": [
    { "name": "Jan", "organic": 4000, "paid": 2400 }
  ],
  "aiInsights": [
    "Insight about ${keyword} marketing..."
  ]
}

Make all data realistic and relevant to "${keyword}".`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    };

    try {
      setIsLoading(true);
      setShowFullScreenLoader(true);
      let messageIndex = 0;
    setLoadingText(loadingMessages[0]);
    
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[messageIndex]);
    }, 600); // Change text every 600ms
    
    // Add minimum loading time for better UX
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2500));
    
      const apiCall = await fetch(`${api_url}?key=${api_key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const [response] = await Promise.all([apiCall, minLoadingTime]);
    
    clearInterval(messageInterval);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;

      // Clean and parse the JSON response
      const cleanedText = generatedText
        .replace(/```json\n?/g, "")
        .replace(/```/g, "")
        .trim();

        const marketingData = JSON.parse(cleanedText);
        setLoadingText('Complete! ✨');
        await new Promise(resolve => setTimeout(resolve, 500));

      // Update all state variables with new data
      if (marketingData.campaignPerformanceData) {
        setCampaignPerformanceData(marketingData.campaignPerformanceData);
      }
      if (marketingData.revenueData) {
        setRevenueData(marketingData.revenueData);
      }
      if (marketingData.audienceData) {
        setAudienceData(marketingData.audienceData);
      }
      if (marketingData.channelConversions) {
        setChannelConversions(marketingData.channelConversions);
      }
      if (marketingData.aiInsights) {
        setAiInsights(marketingData.aiInsights);
      }

      console.log("Data updated successfully for keyword:", keyword);
      return marketingData;
    } catch (error) {
    console.error('Error calling Gemini API:', error);
    setLoadingText('Error occurred');
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw error;
  } finally {
    setShowFullScreenLoader(false);
    setIsLoading(false);
    setLoadingText('');
  }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && searchKeyword.trim()) {
      console.log("Searching for:", searchKeyword);
      try {
        await getGeminiResponse(searchKeyword, "marketing");
      } catch (error) {
        console.error("Failed to fetch new data:", error);
        // You can add error handling UI here
      }
    }
  };
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  const handleInputChange = (e) => {
    // Update searchKeyword on every keystroke
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-indigo-800 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`font-bold text-xl transition-opacity duration-200 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            MarketAI
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-1 rounded hover:bg-indigo-700"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-3 flex items-center cursor-pointer hover:bg-indigo-700 ${
                isActive ? "bg-indigo-700" : ""
              }`
            }
          >
            <TrendingUp size={20} />
            <span
              className={`ml-4 transition-opacity duration-200 ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Dashboard
            </span>
          </NavLink>
          <NavLink
            to="/campaigns"
            className={({ isActive }) =>
              `px-4 py-3 flex items-center cursor-pointer hover:bg-indigo-700 ${
                isActive ? "bg-indigo-700" : ""
              }`
            }
          >
            <Activity size={20} />
            <span
              className={`ml-4 transition-opacity duration-200 ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Campaigns
            </span>
          </NavLink>
          <NavLink
            to="/audience"
            className={({ isActive }) =>
              `px-4 py-3 flex items-center cursor-pointer hover:bg-indigo-700 ${
                isActive ? "bg-indigo-700" : ""
              }`
            }
          >
            <Users size={20} />
            <span
              className={`ml-4 transition-opacity duration-200 ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Audience
            </span>
          </NavLink>
          <div className="px-4 py-3 flex items-center hover:bg-indigo-700 cursor-pointer">
            <DollarSign size={20} />
            <span
              className={`ml-4 transition-opacity duration-200 ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Revenue
            </span>
          </div>
          <div className="px-4 py-3 flex items-center hover:bg-indigo-700 cursor-pointer">
            <Settings size={20} />
            <span
              className={`ml-4 transition-opacity duration-200 ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Settings
            </span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Marketing Analytics Dashboard
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchKeyword}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
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
          {/* Filters and timeframe section */}
          <div className="mb-6 flex justify-between items-center">
            {/* <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTimeframe("7d")}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  selectedTimeframe === "7d"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setSelectedTimeframe("30d")}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  selectedTimeframe === "30d"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setSelectedTimeframe("90d")}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  selectedTimeframe === "90d"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                90 Days
              </button>
              <button
                onClick={() => setSelectedTimeframe("ytd")}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  selectedTimeframe === "ytd"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Year to Date
              </button>
              <button
                onClick={() => setSelectedTimeframe("custom")}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  selectedTimeframe === "custom"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700"
                } flex items-center`}
              >
                <Calendar size={14} className="mr-1" /> Custom
              </button>
            </div> */}
            <div className="flex space-x-2">
              <button
                onClick={refreshData}
                className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-lg flex items-center"
              >
                <RefreshCw
                  size={14}
                  className={`mr-1 ${loading ? "animate-spin" : ""}`}
                />{" "}
                Refresh
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
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Total Revenue
                  </p>
                  <h3 className="text-2xl font-bold mt-1">$248,762</h3>
                </div>
                <div className="p-2 bg-green-100 text-green-800 rounded-lg flex items-center text-sm font-medium">
                  <TrendingUp size={14} className="mr-1" /> +12.5%
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                vs previous period
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Conversion Rate
                  </p>
                  <h3 className="text-2xl font-bold mt-1">3.8%</h3>
                </div>
                <div className="p-2 bg-green-100 text-green-800 rounded-lg flex items-center text-sm font-medium">
                  <TrendingUp size={14} className="mr-1" /> +0.6%
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                vs previous period
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Active Campaigns
                  </p>
                  <h3 className="text-2xl font-bold mt-1">24</h3>
                </div>
                <div className="p-2 bg-red-100 text-red-800 rounded-lg flex items-center text-sm font-medium">
                  <TrendingUp size={14} className="mr-1 transform rotate-180" />{" "}
                  -2
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                vs previous period
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">CAC</p>
                  <h3 className="text-2xl font-bold mt-1">$42.35</h3>
                </div>
                <div className="p-2 bg-green-100 text-green-800 rounded-lg flex items-center text-sm font-medium">
                  <TrendingUp size={14} className="mr-1 transform rotate-180" />{" "}
                  -8.2%
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                vs previous period
              </div>
            </div>
          </div> */}

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">
                  Revenue Performance
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4f46e5"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#94a3b8"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">
                  Campaign Performance
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={campaignPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="impressions" fill="#818cf8" />
                  <Bar dataKey="clicks" fill="#4f46e5" />
                  <Bar dataKey="conversions" fill="#312e81" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">
                  Audience Demographics
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {audienceData.map((entry, index) => (
                      <RechartCell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">
                  Channel Performance
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={channelConversions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="organic"
                    stackId="1"
                    stroke="#4ade80"
                    fill="#bbf7d0"
                  />
                  <Area
                    type="monotone"
                    dataKey="paid"
                    stackId="1"
                    stroke="#4f46e5"
                    fill="#c7d2fe"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-2">
                  <Activity size={16} />
                </div>
                <h3 className="font-semibold text-gray-800">
                  AI-Generated Insights
                </h3>
              </div>
              <div className="text-sm text-indigo-600 font-medium">
                Updated 15 minutes ago
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex">
                    <div className="mr-3 mt-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <TrendingUp size={14} className="text-indigo-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700">{insight}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          Confidence: 92%
                        </div>
                        <button className="text-xs text-indigo-600 font-medium">
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button className="text-indigo-600 font-medium text-sm hover:text-indigo-800">
                View All Insights
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
