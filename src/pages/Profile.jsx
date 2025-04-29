import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Pen, Phone } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const {profile}=useSelector(store=>store.auth);
  const navigate=useNavigate();

  const skilss=["Java","Python","Mysql","React","PHP","Spring Boot"]
  return (
    <div>
      {/* <Header/> */}
      <div className="ml-[20%] p-4 ">
        <div className="w-full p-8  shadow-2xl  border-b-4 border-green-500 rounded-md flex justify-center items-center flex-col">
          <Avatar className="w-32 h-32 ">
            <AvatarImage src="https://github.com/shadcn.png" alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-bold text-xl ">{profile?.name}</h1>
          

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2 font-bold">
              <span>
                <Mail />
              </span>
              <span>{profile?.email}</span>
            </div>
            <div className="flex gap-2 font-bold">
              <span>
                <Phone />
              </span>
              <span>{profile?.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-evenly items-center py-5  rounded-md">
        <a href="http://www.instagra.com" className="text-orange-400 text-xl font-bold" target="_blank" >Resume</a>
        <Button title="update resume" onClick={()=>navigate("/user/dashboard/resume/update")}><Pen/></Button>
        </div>

        <div className="p-4">
          <h3 className="font-bold">Bio :</h3>
          <p className="font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor et fugit voluptas cum possimus sint accusamus repellat. Quidem, dolores! Iste.</p>
        </div>

        <div className="p-4 ">
          <h3 className="font-bold">Skills :</h3>
          <div className="flex gap-3 flex-wrap my-2">
          {
            skilss.map((item)=>{
              return(
                  <Badge className={'sm:px-8 sm:py-3 cursor-pointer sm:text-md font-bold'}>{item}</Badge>
                )
              })
            }
            </div>
        </div>
        {/* pro */}
      </div>
    </div>
  );
};

export default Profile;
