import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiserver } from "@/main";
import { AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { Bookmark, Loader2, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CompanyCard = () => {
  const [suggestedjob,setSuggestedjob]=useState([]);
  const [loading,setLoading]=useState(false);

  const GetMyallJobs=async()=>{
    try {
      setLoading(true);
      const res=await axios.get(`${apiserver}/jobs/suggested/jobs`,{withCredentials:true});
      if(res?.data?.success){
        // console.log(res.data);
        setSuggestedjob([...res?.data?.job]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setLoading(false);
    }
    

  }

  useEffect(()=>{
    GetMyallJobs();
  },[])

  return (
    <div className="p-2">
        {loading && <div className="w-full h-[200px] flex justify-center items-center bg-blue-600 text-white"><Loader2 className="w-4 h-4 animate-spin "/> Loading....</div>}
      <span className="mx-5 font-semibold ">
        Get in touch with top <span className="text-blue-700">companies</span>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center mx-5  ">
        {suggestedjob?.map((item, index) => {
          return (
            <div className="w-full  border-2  p-5 shadow-sm  " key={item?._id}>
              <div className="flex justify-between w-full p-3">
                <span>2 days ago</span>
                <Bookmark className="cursor-pointer" />
              </div>

              <div className="flex gap-3  items-center  ">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="img" />
                </Avatar>
                <div>
                  <h3>{item?.company?.name}</h3>
                  <Badge className={"bg-pink-400 hover:bg-pink-500"}>
                    {item?.location.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <h1 className="p-2 font-bold uppercase">{item?.title}</h1>
              <hr className="h-2 my-2 text-blue-700" />
              <p className="line-clamp-4">
                {item?.description}
              </p>
              <div className="flex  items-center gap-3 my-3">
                <Badge
                  className={"text-red-600 p-2 text-center"}
                  variant={"ghost"}
                >
                  {item?.salary}
                </Badge>
                <Badge
                  className={"text-blue-600 p-2 text-center"}
                  variant={"ghost"}
                >
                  {item?.position} Positions
                </Badge>
                <Badge
                  className={"text-pink-600 p-2 text-center"}
                  variant={"ghost"}
                >
                  {item?.jobType}
                </Badge>
              </div>
              <div>
                <Link to={`/jobs/${item?._id}`}>
                  <Button variant="ghost">Get details...</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyCard;
