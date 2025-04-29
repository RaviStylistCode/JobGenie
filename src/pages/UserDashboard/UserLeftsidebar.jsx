import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiserver } from "@/main";
import { logout } from "@/redux/Actions/Useraction";
import axios from "axios";
import { Home, LogOut, Settings, Settings2, SkipBack, SquareArrowLeft, Store } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserLeftsidebar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const Logouthandler=async()=>{
    try {
      const res=await axios.get(`${apiserver}/users/logout`,{withCredentials:true});
      if(res?.data?.success){
        toast.success(res?.data?.message);
        dispatch(logout());
        navigate("/");
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const sidebarhandler=(textType)=>{
    if(textType === 'Profile') navigate("/user/dashboard/profile")
    else if(textType==="Home") navigate("/user/dashboard/")
    else if(textType==='Back_to_app') navigate("/")
    else if(textType==='Jobs_applied') navigate("/user/dashboard/job/applied");
    else if(textType==='Logout') Logouthandler();
  }

  const sidebar = [
    { icon: <Home />, text: "Home" },
    { icon: <Store />, text: "Jobs_applied" },
    {
      icon:<Avatar className='w-7 h-7'>
        <AvatarImage src='https://github.com/shadcn.png' alt='img'/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>,
      text:"Profile"
    },
    {icon:<LogOut/>,text:"Logout"},
    {icon:<Settings/>,text:"Setting"},
    {icon:<SquareArrowLeft/>,text:"Back_to_app"}
  ];
  return (
    <div className="w-[20%] h-screen bg-[#C0C0C0] text-black rounded-e-sm fixed">
      <div className="py-8">
        {sidebar.map((item, index) => {
          return (
            <div onClick={()=>sidebarhandler(item.text)} className="flex gap-3  justify-center md:justify-start  items-center cursor-pointer hover:bg-slate-300 p-4 rounded-lg">
              {item.icon} <span className="hidden md:block  font-bold">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserLeftsidebar;
