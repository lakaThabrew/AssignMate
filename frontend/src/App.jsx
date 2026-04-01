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
import ProtectedRoute from './components/ProtectedRoute';
import { RoleProvider, useRole } from './context/RoleContext';

function AppContent() {
  const { isLoggedIn } = useRole();

  return (
    <div className="app">
      {isLoggedIn && <Navbar />}
      <main className="container" style={{ marginTop: '1rem', flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* User Protected Routes (Common) */}
          <Route element={<ProtectedRoute />}>
             <Route path="/" element={<Dashboard />} />
             <Route path="/results/:id" element={<Results />} />
             <Route path="/results" element={<History />} />
          </Route>

          {/* Student-Only Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
             <Route path="/upload" element={<Upload />} />
          </Route>

          {/* Lecturer-Only Routes */}
          <Route element={<ProtectedRoute allowedRoles={['lecturer']} />}>
             <Route path="/rubrics" element={<RubricBuilder />} />
          </Route>

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
export { useRole };
