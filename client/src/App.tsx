import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './global.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SurveyTemplatesList from './components/SurveyTemplatesList';
import Survey from './pages/Survey';
import EditSurvey from './pages/EditSurvey';
import NewSurveyTemplate from './pages/NewSurveyTemplate';
import Cookies from "js-cookie";
import Navbar from './components/Navbar';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode | ReactNode[]
}

const ProtectedRoute = ({ children } : ProtectedRouteProps) => {
  if (!Cookies.get("token")) {
    return <Navigate to="/login" replace />;
  }

  return <div className="flex flex-col items-center justify-center w-full">
    <Navbar />
    <div className='w-full'>
    {children}
    </div>
  </div>
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/survey/:id" element={<Survey />} />
        
        {/* PROTECTED ROUTES (ADMIN) */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/surveys" element={
          <ProtectedRoute>
            <SurveyTemplatesList />
          </ProtectedRoute>
        } />
        <Route path="/survey-templates/new" element={
          <ProtectedRoute>
            <NewSurveyTemplate />
          </ProtectedRoute>
        } />
        <Route path="/survey-templates/edit/:id" element={
          <ProtectedRoute>
            <EditSurvey />
          </ProtectedRoute>
        } />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;