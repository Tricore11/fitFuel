import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import UserProfileForm from './components/UserProfileForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-indigo-600 text-white p-4">
          <div className="container mx-auto flex items-center">
            <Dumbbell className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">FitFuel</h1>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<UserProfileForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;