import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import ConnectPage from './pages/Connect/ConnectPage';
import ConnectNewChannel from './pages/Connect/ConnectNewChannel';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <main>
              <Hero />
              <Features />
            </main>
            <Footer />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/connect/new" element={<ConnectNewChannel />} />
          <Route path="/publish" element={<div>Publish Page</div>} />
          <Route path="/engage" element={<div>Engage Page</div>} />
          <Route path="/promote" element={<div>Promote Page</div>} />
          <Route path="/analyze" element={<div>Analyze Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
