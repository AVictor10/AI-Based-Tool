// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from './App.jsx';
// import Campaignspage from './Campaignspage.jsx';
// import AudiencePage from './AudiencePage.jsx';
// import RevenuePage from './RevenuePage.jsx';
// import SettingsPage from './SettingsPage.jsx';
// import HomePage from './HomePage.jsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/campaigns" element={<Campaignspage />} />
//         <Route path="/audience" element={<AudiencePage />} />
//         <Route path="/revenue" element={<RevenuePage />} />
//         <Route path="/settings" element={<SettingsPage />} />
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Campaignspage from './Campaignspage.jsx';
import AudiencePage from './AudiencePage.jsx';
import RevenuePage from './RevenuePage.jsx';
import SettingsPage from './SettingsPage.jsx';
import HomePage from './HomePage.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<App />} />
        <Route path="/campaigns" element={<Campaignspage />} />
        <Route path="/audience" element={<AudiencePage />} />
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);