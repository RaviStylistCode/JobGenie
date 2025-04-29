import { apiserver } from "@/main";
import { logout } from "@/redux/Actions/Useraction";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useGetLogoutuser = () => {
  const dispath = useDispatch();

  const myLogout = async () => {
    try {
      const res = await axios.get(`${apiserver}/users/logout`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispath(logout());
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(()=>{
    myLogout();
  },[])
};

export default useGetLogoutuser;
