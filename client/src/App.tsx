import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './global.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SurveysList from './pages/SurveysList';
import Survey from './pages/Survey';
import EditSurvey from './pages/EditSurvey';
import NewSurvey from './pages/NewSurvey';
import Cookies from "js-cookie";
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode | ReactNode[]
}

const ProtectedRoute = ({ children } : ProtectedRouteProps) => {
  if (!Cookies.get("token")) {
    return <Navigate to="/login" replace />;
  }
  return children;
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
            <SurveysList />
          </ProtectedRoute>
        } />
        <Route path="/surveys/new" element={
          <ProtectedRoute>
            <NewSurvey />
          </ProtectedRoute>
        } />
        <Route path="/surveys/edit/:id" element={
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