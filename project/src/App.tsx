import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { InternPage } from './pages/InternPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Sidebar />
        <main className="ml-64 p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/interns" replace />} />
            <Route path="/interns" element={<InternPage />} />
            <Route path="/dashboard" element={<div>Dashboard Coming Soon</div>} />
            <Route path="/tasks" element={<div>Tasks Coming Soon</div>} />
            <Route path="/schedule" element={<div>Schedule Coming Soon</div>} />
            <Route path="/notifications" element={<div>Notifications Coming Soon</div>} />
            <Route path="/settings" element={<div>Settings Coming Soon</div>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;