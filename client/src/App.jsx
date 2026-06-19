import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/admin/DashboardLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Lazy load admin pages
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/ui/LoadingSpinner';

const DashboardProjects = lazy(() => import('./pages/admin/DashboardProjects'));
const ProjectForm = lazy(() => import('./pages/admin/ProjectForm'));
const ProfileForm = lazy(() => import('./pages/admin/ProfileForm'));
const DashboardMessages = lazy(() => import('./pages/admin/DashboardMessages'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                  border: '1px solid var(--toast-border)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '16px',
                },
                success: {
                  style: {
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#ffffff',
                    border: '1px solid #059669',
                  },
                },
                error: {
                  style: {
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: '#ffffff',
                    border: '1px solid #dc2626',
                  },
                },
              }}
            />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              } />
              
              <Route path="/projects" element={
                <>
                  <Navbar />
                  <Projects />
                  <Footer />
                </>
              } />
              
              <Route path="/projects/:id" element={
                <>
                  <Navbar />
                  <ProjectDetail />
                  <Footer />
                </>
              } />
              
              <Route path="/login" element={<Login />} />
              
              {/* Admin Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="projects" element={
                  <Suspense fallback={<LoadingSpinner size="xl" className="h-64" />}>
                    <DashboardProjects />
                  </Suspense>
                } />
                <Route path="projects/new" element={
                  <Suspense fallback={<LoadingSpinner size="xl" className="h-64" />}>
                    <ProjectForm />
                  </Suspense>
                } />
                <Route path="projects/:id/edit" element={
                  <Suspense fallback={<LoadingSpinner size="xl" className="h-64" />}>
                    <ProjectForm />
                  </Suspense>
                } />
                <Route path="messages" element={
                  <Suspense fallback={<LoadingSpinner size="xl" className="h-64" />}>
                    <DashboardMessages />
                  </Suspense>
                } />
                <Route path="profile" element={
                  <Suspense fallback={<LoadingSpinner size="xl" className="h-64" />}>
                    <ProfileForm />
                  </Suspense>
                } />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={
                <>
                  <Navbar />
                  <div className="min-h-screen flex items-center justify-center pt-20">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        404 - Page Not Found
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 mb-8">
                        The page you're looking for doesn't exist.
                      </p>
                      <a href="/" className="btn-primary">
                        Go Home
                      </a>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;