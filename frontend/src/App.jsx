import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Results from './pages/Results';
import RubricBuilder from './pages/RubricBuilder';
import History from './pages/History';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { RoleProvider, useRole } from './context/RoleContext';

function AppContent() {
  const { isLoggedIn } = useRole();

  if (!isLoggedIn) {
    return (
      <div className="app">
        <main className="container" style={{ marginTop: '2rem' }}>
          <Login />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <main className="container" style={{ marginTop: '2rem', flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/rubrics" element={<RubricBuilder />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/results" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </RoleProvider>
  );
}

export default App;
export { useRole }; // Re-export for convenience to minimize page updates
