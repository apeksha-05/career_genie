import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { restoreAuth } from './store/authSlice';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import JobsPage from './pages/JobsPage';
import JobDetails from './pages/JobDetails';
import ApplicationsTracker from './pages/ApplicationsTracker';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PostJobForm from './components/PostJobForm';
import CandidatePanel from './components/CandidatePanel';
import AdminPanel from './pages/AdminPanel';
import ResumeUpload from './pages/ResumeUpload';
import { useNavigate, Link } from 'react-router-dom';

import StudentDashboard from './pages/StudentDashboard';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard/student" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/student/jobs" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <JobsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/student/jobs/:id" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <JobDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/student/resume" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <ResumeUpload />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/student/applications" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <ApplicationsTracker />
            </ProtectedRoute>
          } 
        />
        {/* Recruiter Routes */}
        <Route 
          path="/dashboard/recruiter" 
          element={
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
              <RecruiterDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/recruiter/jobs/new" 
          element={
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
              <PostJobForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/recruiter/jobs/:id/edit" 
          element={
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
              <PostJobForm editMode />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/recruiter/jobs/:id/applicants" 
          element={
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
              <CandidatePanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/jobs" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
