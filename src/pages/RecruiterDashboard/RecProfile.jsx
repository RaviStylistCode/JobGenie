import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const RecProfile = () => {
  const {profile}=useSelector(store=>store.auth);
  return (
    <div className="ml-[22%]">
  
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
    </div>
  );
};

export default RecProfile;
