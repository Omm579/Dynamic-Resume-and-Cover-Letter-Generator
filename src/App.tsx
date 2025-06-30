import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResumeForm from './pages/ResumeForm';
import Preview from './pages/Preview';
import Download from './pages/Download';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume-form" element={<ResumeForm />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/download" element={<Download />} />
          </Routes>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;