import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './utils/ScrollToTop';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import WhatsAppButton from './components/WhatsAppButton';

// Eager load: Critical for initial page load (LCP optimization)
import HomePage from './pages/HomePage';

// Lazy load: Non-critical pages to improve initial bundle size
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const InquiryPage = lazy(() => import('./pages/InquiryPage'));
const AddProject = lazy(() => import('./pages/AddProject'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

// Loading fallback component
const PageLoader = () => (
  <div 
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#faf9f6',
      fontFamily: "'Poppins', sans-serif"
    }}
  >
    <div 
      style={{
        width: '60px',
        height: '60px',
        border: '4px solid #e0e0e0',
        borderTop: '4px solid #FF9933',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
    <p 
      style={{
        marginTop: '1.5rem',
        fontSize: '1.1rem',
        color: '#2e241f',
        fontWeight: '500'
      }}
    >
      Loading...
    </p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/add-project" element={<AddProject />} />
        </Routes>
      </Suspense>
      <MobileBottomNav />
      <WhatsAppButton />
      </Router>
    </HelmetProvider>
  );
}

export default App;
