import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiserver } from "@/main";
import axios from "axios";
import { Bookmark, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

const Browse = () => {
  const [data,setData]=useSearchParams();
  const query=data.get("name");
  console.log(query);
  const [arr,setArray]=useState([]);
  const [loading,setLoading]=useState(false);

  const GetMatchingJobs=async()=>{

    try {
      setLoading(true);
      const res=await axios.get(`${apiserver}/jobs/all/jobs?keyword=${query}`,{withCredentials:true});
      if(res.data.success){
        // console.log(res.data);
        setArray([...res?.data?.job]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    GetMatchingJobs();
  },[query]);
  
  
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-4 ">
        <h1 className="font-bold text-lg">Search Results : {arr.length}</h1>

        {loading && <div className="w-full h-[200px] flex justify-center items-center bg-blue-600 text-white"><Loader2 className="w-4 h-4 animate-spin "/> Loading....</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
          {arr?.map((item, index) => {
            return (
              <div className="w-full rounded-md border-2 border-gray-400 shadow-2xl p-2">
                <div className="flex justify-between p-4">
                  <span>2 days ago</span>
                  <Bookmark />
                </div>
                <div className="flex gap-3">
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="img"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1>{item?.company?.name}</h1>
                    <Badge>{item?.location.toUpperCase()}</Badge>
                  </div>
                </div>

                  <h1 className="p-2 font-bold">{item?.title}</h1>
                <hr className="my-3" />
                <div className="flex flex-col gap-3 p-2">
                  <p>
                   {item?.description}
                  </p>
                </div>

                <div className="flex gap-4 p-2">
                  <Badge
                    className={"text-blue-500 font-bold "}
                    variant={"ghost"}
                  >
                    {item?.position} Positions
                  </Badge>
                  <Badge
                    className={"text-red-500  font-bold"}
                    variant={"ghost"}
                  >
                    {item?.jobType.toUpperCase()}
                  </Badge>
                  <Badge
                    className={"text-violet-500  font-bold"}
                    variant={"ghost"}
                  >
                    {item?.salary}
                  </Badge>
                </div>

                <div>
                    <Link to={`/jobs/${item?._id}`}>
                    <Button variant='ghost'>Get Details</Button>
                    </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
