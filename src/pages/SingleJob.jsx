import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiserver } from "@/main";
import axios from "axios";
import {
  BriefcaseBusiness,
  IndianRupee,
  Loader2,
  MapPin,
  Pin,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SingleJob = () => {
  const { id } = useParams();
  const [singlejob, setSinglejob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, SetDate] = useState("");
  // let singlejob;
  const { user } = useSelector((store) => store.auth);
  const navigate=useNavigate();

  const GetSinglejob = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiserver}/jobs/${id}`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        // console.log(res.data);
        setSinglejob([res?.data?.job]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getDate = () => {
    if (!singlejob[0]?.createdAt) {
      SetDate("Date not available");
      return;
    }

    const createdDate = new Date(singlejob[0]?.createdAt);
    const todayDate = new Date();

    const diffTime = todayDate - createdDate; // milliseconds difference
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert to days

    if (diffDays === 0) {
      SetDate("Today");
    } else if (diffDays === 1) {
      SetDate(`${diffDays} day ago`);
    } else if (diffDays > 1) {
      SetDate(`${diffDays} days ago`);
    } else {
      SetDate("Invalid date");
    }
  };

  useEffect(() => {
    GetSinglejob();
  }, [id]);

  useEffect(() => {
    if (singlejob.length > 0) getDate();
  }, [singlejob]);

  const applyJobhandler=async()=>{
    try {
      setLoading(true);
      const res=await axios.get(`${apiserver}/applications/apply/${id}`,{withCredentials:true});
      if(res?.data?.success){
        toast.success(res?.data?.message);
        navigate("/user/dashboard/job/applied");
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setLoading(false);
    }
  }

  // console.log(singlejob);
  return (
    <div>
      <Header />
      <div className="w-full sm:w-3/4 mx-auto p-5 rounded-md border border-gray-300">
        {loading && (
          <div className="w-full h-[200px] flex justify-center items-center bg-blue-600 text-white">
            <Loader2 className="w-4 h-4 animate-spin " /> Loading....
          </div>
        )}
        {user ? (
          <div className="flex items-center justify-between p-2 shadow-2xl rounded-t-md">
            <span>{date}</span>
            {singlejob[0]?.applications.includes(user?._id) ? (
              <Button disabled={true}>Applied</Button>
            ) : (
              <Button onClick={()=>applyJobhandler()}>{loading ? "Please wait...":"Apply Now"}</Button>
            )}
          </div>
        ) : (
          <p className="font-semibold text-lg text-center underline">
            Please Login for applying in a job.
          </p>
        )}
        <div className="w-full p-2  shadow-2xl rounded-b-md border-b-2 border-rose-800 flex items-center flex-col sm:flex-row">
          <Avatar className="w-24 h-24 border-4 border-rose-700 ">
            <AvatarImage src="https://github.com/shadcn.png" alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex gap-5 p-2 font-bold">
            <h1 className="">{singlejob[0]?.company?.name}</h1>
            <Badge className={"  font-bold text-center"}>
              {singlejob[0]?.location}
            </Badge>
          </div>
        </div>
        <div className="w-full p-4 shadow-2xl  rounded-md  my-2">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="flex gap-3">
              <BriefcaseBusiness /> <span>{singlejob[0]?.experience}</span>
            </div>
            <div className="flex gap-3">
              <IndianRupee /> <span>{singlejob[0]?.salary}</span>
            </div>
            <div className="flex gap-3">
              <Pin /> <span>{singlejob[0]?.locationType}</span>
            </div>
            <div className="flex gap-3">
              <MapPin /> <span>{singlejob[0]?.location}</span>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex gap-3">
            <h3 className="font-bold">Title :</h3>
            <span>{singlejob[0]?.title.toUpperCase()}</span>
          </div>
          <div>
            <h3 className="font-bold">Description :</h3>
            <p className="font-semibold  text-sm p-1">
              {singlejob[0]?.description}{" "}
            </p>
          </div>

          <div className="flex gap-3">
            <h3 className="font-bold">JobType :</h3>
            <span>{singlejob[0]?.jobType}</span>
          </div>

          <div className="flex gap-3">
            <h3 className="font-bold">Position :</h3>
            <span>{singlejob[0]?.position}</span>
          </div>

          <div className="flex gap-3">
            <h3 className="font-bold">Experience :</h3>
            <span>{singlejob[0]?.experience}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <h3 className="font-bold">Requirements :</h3>
            <div className="flex flex-wrap gap-4">
              {singlejob[0]?.requirements?.map((item) => {
                return (
                  <div className="">
                    <Badge key={item} className={"px-5 py-2"}>
                      {item}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
