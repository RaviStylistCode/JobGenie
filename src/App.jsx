import React, { useEffect } from 'react'
import { createBrowserRouter,  RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import MainLayout from './pages/UserDashboard/MainLayout'
import UserHome from './pages/UserDashboard/UserHome'
import SingleJob from './pages/SingleJob'
import JobApplied from './pages/UserDashboard/JobApplied'
import RecMainLayout from './pages/RecruiterDashboard/RecMainLayout'
import RecHome from './pages/RecruiterDashboard/RecHome'
import RecProfile from './pages/RecruiterDashboard/RecProfile'
import Company from './pages/RecruiterDashboard/Company'
import RecJobs from './pages/RecruiterDashboard/RecJobs'
import RecSettings from './pages/RecruiterDashboard/RecSettings'
import CompanyCreate from './pages/RecruiterDashboard/CompanyCreate'
import JobCreate from './pages/RecruiterDashboard/JobCreate'
import Forgetpassword from './pages/auth/Forgetpassword'
import Resetpassword from './pages/auth/Resetpassword'
import toast from 'react-hot-toast'
import axios from 'axios'
import { apiserver } from './main'
import { useDispatch } from 'react-redux'
import { setProfile } from './redux/Actions/Useraction'
import UpdateResume from './pages/UserDashboard/UpdateResume'


const App = () => {
  const dispatch=useDispatch();

  const getMyProfile=async()=>{
    try {
      const res=await axios.get(`${apiserver}/users/me`,{withCredentials:true});
      if(res?.data?.user){
        dispatch(setProfile(res?.data?.user));
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(()=>{
    getMyProfile();
  },[])

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/jobs",
      element:<Jobs/>
    },
    {
      path:"/jobs/:id",
      element:<SingleJob/>
    },
    {
      path:"/search",
      element:<Browse/>
    },
    {
      path:"/user/dashboard",
      element:<MainLayout/>,
      children:[
        {
          path:"/user/dashboard",
          element:<UserHome/>
        }
        ,
        {
          path:"/user/dashboard/profile",
          element:<Profile/>
        },
        {
          path:"/user/dashboard/resume/update",
          element:<UpdateResume/>
        },
        {
          path:"/user/dashboard/job/applied",
          element:<JobApplied/>
        }
      ]
    },
    {
      path:"/recruiter/main/home",
      element:<RecMainLayout/>,
      children:[
        {
          path:"/recruiter/main/home",
          element:<RecHome/>
        },
        {
          path:"/recruiter/main/home/profile",
          element:<RecProfile/>
        },
        {
          path:"/recruiter/main/home/company",
          element:<Company/>
        },
        {
          path:"/recruiter/main/home/company/create",
          element:<CompanyCreate/>
        },
        {
          path:"/recruiter/main/home/job",
          element:<RecJobs/>
        },
        {
          path:"/recruiter/main/home/job/create",
          element:<JobCreate/>
        },
        {
          path:"/recruiter/main/home/settings",
          element:<RecSettings/>
        }
      ]
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/forget/password",
      element:<Forgetpassword/>
    },
    {
      path:"/reset/password/new/add",
      element:<Resetpassword/>
    },

  ])
  return (
    <RouterProvider router={router} />
  
   
  )
}

export default App