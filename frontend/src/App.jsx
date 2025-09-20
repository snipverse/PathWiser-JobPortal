import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { setUser } from './redux/authSlice';
import { USER_API_END_POINT } from './utils/constant';
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import ResumeBuilder from './components/ResumeBuilder'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/resume-builder",
    element: <ResumeBuilder />
  },
  // admin dashboard route
  {
    path: "/admin",
    element: <AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>
  },
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },

])
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // On app load, check for valid session and restore user
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`);
        if (res.data.success && res.data.user) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        dispatch(setUser(null));
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
