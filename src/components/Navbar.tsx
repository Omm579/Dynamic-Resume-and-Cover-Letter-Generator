import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Home, Eye, Download } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/resume-form', label: 'Create Resume', icon: FileText },
    { path: '/preview', label: 'Preview', icon: Eye },
    { path: '/download', label: 'Download', icon: Download }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">ResumeAI</span>
          </Link>

          <div className="flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;