import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiserver } from "@/main";
import toast from "react-hot-toast";

const RecJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const getMyalljobs = async () => {
    try {
      const res = await axios.get(`${apiserver}/jobs/my/jobs`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        setJobs([...res?.data?.job]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getMyalljobs();
  }, []);
  // console.log(jobs);

  return (
    <div className="ml-[20%] p-4">
      <div className="grid grid-cols-2 p-4  border border-green-500 rounded-md">
        <h1 className="font-bold md:text-2xl items-center text-blue-600">
          Create Job
        </h1>
        <Button
          className="bg-blue-500"
          onClick={() => navigate("/recruiter/main/home/job/create")}
        >
          Create
        </Button>
      </div>

      <h1 className="p-4 font-bold text-lg my-5 ">All jobs</h1>
      <div>
        <Table>
          <TableCaption>A list of your recent created jobs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">JobId</TableHead>
              <TableHead>JobName</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs?.map((job) => {
              return(
              <TableRow key={job?._id}>
                <TableCell className="font-medium">{job?._id}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.location}</TableCell>
                <TableCell className="">
                  <Button className="bg-blue-500">
                    <Edit />
                  </Button>{" "}
                  <Button className="bg-red-500">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecJobs;
